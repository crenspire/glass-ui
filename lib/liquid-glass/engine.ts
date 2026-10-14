import { selectShapes, type ShapeCandidate } from "./budget"
import { clipsContent, effectiveOpacity, insideClips, paintsOverBackdrop } from "./occlusion"

/* WebGL liquid-glass renderer. A canvas sits behind the UI; every [data-glass] element gets
   refracting glass drawn beneath it (live position/size/radius/opacity). [data-glass-solid]
   elements are painted into the scene so glass can refract them. */

export type GlassPreset = "button" | "bar" | "card" | "sheet" | "knob" | "blob"

export interface LiquidGlassOptions {
  /** Max refraction offset at the rim, in px. */
  refraction?: number
  /** Chromatic dispersion, 0–1. */
  dispersion?: number
  /** Blur radius of the frosted layer, in px. */
  frost?: number
  /** Width of the curved rim, in px. */
  bezel?: number
  /** Smooth-union radius for merging shapes, in px. */
  mergeK?: number
  mode?: "light" | "dark"
  /** Squash, stretch and press-to-grow. */
  liquid?: boolean
}

export interface GlassShape {
  grow: number
  squash: number
  frost: number
  tint: number
  tintPressed?: number
  tintColor?: [number, number, number]
  merge: number
  layer: number
}

interface GlassItem extends GlassShape {
  el: HTMLElement
  sx: number; sy: number; vx: number; vy: number
  v: { x: number; y: number }
  last: { x: number; y: number } | null
  pressed: boolean; held: boolean
  scs: string; t: number
  down: () => void
  id: number
  parent: GlassItem | null
  /** A non-glass ancestor paints over the canvas, so shader glass would be hidden. */
  blocked: boolean
  /** Ancestors whose overflow clips this element (scroll containers). */
  clips: Element[]
  live: boolean
}

interface Solid {
  el: HTMLElement; layer: number; opacity: string; live: boolean
  parent: GlassItem | null; blocked: boolean; clips: Element[]
}

type Source = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement

const MAXG = 32, MAXS = 8
const PRESETS: Record<GlassPreset, GlassShape> = {
  button: { grow: 0.14, squash: 1, frost: 0.15, tint: 0, merge: 0, layer: 0 },
  bar:    { grow: 0.03, squash: 0.4, frost: 0.45, tint: 0, merge: 0, layer: 0 },
  card:   { grow: 0, squash: 0, frost: 1, tint: 0.2, merge: 0, layer: 0 },
  sheet:  { grow: 0, squash: 0, frost: 1, tint: 0.28, merge: 1, layer: 0 },
  knob:   { grow: 0.5, squash: 1, frost: 0, tint: 1, tintPressed: 0, tintColor: [1, 1, 1], merge: 0, layer: 1 },
  blob:   { grow: 0.1, squash: 1.6, frost: 0.1, tint: 0, merge: 1, layer: 0 },
}
const VS = 'attribute vec2 p;varying vec2 vUv;void main(){vUv=p*.5+.5;vUv.y=1.-vUv.y;gl_Position=vec4(p,0.,1.);}';
const FS = `precision highp float;
#define MAXG ${MAXG}
#define MAXS ${MAXS}
varying vec2 vUv;
uniform sampler2D uTex;uniform sampler2D uBlur;uniform vec2 uRes;uniform vec4 uFit;
uniform vec4 uG[MAXG];uniform vec4 uGP[MAXG];uniform vec4 uGT[MAXG];uniform int uGN;
uniform vec4 uS[MAXS];uniform vec4 uSC[MAXS];uniform vec4 uSP[MAXS];uniform int uSN;
uniform float uBezel;uniform float uStrength;uniform float uDisp;uniform float uMergeK;uniform float uDark;uniform vec2 uPtr;
float sdRR(vec2 p,vec2 b,float r){r=min(r,min(b.x,b.y));vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float smin(float a,float b,float k){float h=max(k-abs(a-b),0.)/k;return min(a,b)-h*h*k*.25;}
float lay(vec4 q){return q.y>1.5?1.:0.;}
float field(vec2 p,float L){
 float dm=1e4;float dh=1e4;
 for(int i=0;i<MAXG;i++){if(i>=uGN)break;
if(uGT[i].w<.002||abs(lay(uGP[i])-L)>.5)continue;
float d=sdRR(p-uG[i].xy,uG[i].zw,uGP[i].x);
if(uGP[i].y>.5&&uGP[i].y<1.5)dm=smin(dm,d,uMergeK);else dh=min(dh,d);}
 return min(dm,dh);}
void nearest(vec2 p,float L,out vec4 P,out vec4 T,out float hm){
 float best=1e4;P=vec4(0.);T=vec4(0.);hm=1.;
 for(int i=0;i<MAXG;i++){if(i>=uGN)break;
if(uGT[i].w<.002||abs(lay(uGP[i])-L)>.5)continue;
float d=sdRR(p-uG[i].xy,uG[i].zw,uGP[i].x);
if(d<best){best=d;P=uGP[i];T=uGT[i];hm=min(uG[i].z,uG[i].w);}}}
vec3 bg(vec2 px,float fr){vec2 u=clamp(px/uRes,0.,1.);vec3 c=texture2D(uTex,u*uFit.xy+uFit.zw).rgb;
 if(fr>.001)c=mix(c,texture2D(uBlur,u).rgb,fr);return c;}
vec3 solids(vec2 px,vec3 c,float L){
 for(int i=0;i<MAXS;i++){if(i>=uSN)break;if(abs(uSP[i].y-L)>.5)continue;
float d=sdRR(px-uS[i].xy,uS[i].zw,uSP[i].x);c=mix(c,uSC[i].rgb,clamp(.5-d,0.,1.)*uSC[i].a);}
 return c;}
vec3 scene(vec2 px,float fr){return solids(px,bg(px,fr),0.);}
vec3 finish(vec3 col,vec2 px,vec2 g,float x,float inside,vec4 P,vec4 T){
 float l=dot(col,vec3(.299,.587,.114));col=mix(vec3(l),col,1.2);
 col=uDark>.5?col*.78+.015:col*1.02+.03;
 col=mix(col,T.rgb,P.z);
 vec2 Ld=normalize(uPtr-px+vec2(.001));float fc=dot(g,Ld);float rim=pow(1.-x,6.);
 float hi=rim*(max(fc,0.)*.85+max(-fc,0.)*.3)+(1.-smoothstep(0.,1.5,inside))*.22;
 return col+vec3(hi*(uDark>.5?.6:1.));}
float shadow(vec2 px,float L){return 1.-smoothstep(-16.,34.,field(px-vec2(0.,10.),L));}
vec3 shade0(vec2 px){
 float d=field(px,0.);vec3 base=scene(px,0.);
 if(d<60.)base*=1.-shadow(px,0.)*(uDark>.5?.32:.16)*smoothstep(0.,2.,d);
 if(d>=.5)return base;
 vec4 P;vec4 T;float hm;nearest(px,0.,P,T,hm);
 float bez=min(uBezel,hm*.85);float inside=max(-d,0.);float x=clamp(inside/bez,0.,1.);
 vec2 e=vec2(.75,0.);
 vec2 g=vec2(field(px+e.xy,0.)-field(px-e.xy,0.),field(px+e.yx,0.)-field(px-e.yx,0.));g/=max(length(g),1e-4);
 vec2 off=-g*uStrength*min(1.,hm/40.)*pow(1.-x,2.2);
 float fr=P.w;vec3 col;
 col.r=scene(px+off*(1.+uDisp),fr).r;col.g=scene(px+off,fr).g;col.b=scene(px+off*(1.-uDisp),fr).b;
 col=finish(col,px,g,x,inside,P,T);
 return mix(base,col,clamp(.5-d,0.,1.)*T.w);}
vec3 top0(vec2 px){return solids(px,shade0(px),1.);}
void main(){
 vec2 px=vUv*uRes;float d=field(px,1.);vec3 base=top0(px);
 if(d<60.)base*=1.-shadow(px,1.)*(uDark>.5?.3:.14)*smoothstep(0.,2.,d);
 if(d>=.5){gl_FragColor=vec4(base,1.);return;}
 vec4 P;vec4 T;float hm;nearest(px,1.,P,T,hm);
 float bez=min(uBezel,hm*.85);float inside=max(-d,0.);float x=clamp(inside/bez,0.,1.);
 vec2 e=vec2(.75,0.);
 vec2 g=vec2(field(px+e.xy,1.)-field(px-e.xy,1.),field(px+e.yx,1.)-field(px-e.yx,1.));g/=max(length(g),1e-4);
 vec2 off=-g*uStrength*min(1.,hm/40.)*pow(1.-x,2.2);
 vec3 col;col.r=top0(px+off*(1.+uDisp)).r;col.g=top0(px+off).g;col.b=top0(px+off*(1.-uDisp)).b;
 col=finish(col,px,g,x,inside,P,T);
 gl_FragColor=vec4(mix(base,col,clamp(.5-d,0.,1.)*T.w),1.);}`;


/* Computed colours come back in whatever space the stylesheet used (Tailwind v4 emits
   oklab/oklch/lab), so let a 2D canvas resolve them to sRGB rather than parsing by hand. */
const colorCache = new Map<string, [number, number, number, number]>()
let colorCtx: CanvasRenderingContext2D | null = null
function parseColor(s: string): [number, number, number, number] {
  const hit = colorCache.get(s)
  if (hit) return hit
  let out: [number, number, number, number] = [0, 0, 0, 0]
  if (s && s !== "transparent") {
    colorCtx ??= Object.assign(document.createElement("canvas"), { width: 1, height: 1 }).getContext("2d", { willReadFrequently: true })
    if (colorCtx) {
      colorCtx.clearRect(0, 0, 1, 1)
      colorCtx.fillStyle = s
      colorCtx.fillRect(0, 0, 1, 1)
      const [r, g, b, a] = colorCtx.getImageData(0, 0, 1, 1).data
      out = a ? [r / 255, g / 255, b / 255, a / 255] : [0, 0, 0, 0]
    }
  }
  if (colorCache.size > 256) colorCache.clear()
  colorCache.set(s, out)
  return out
}
const len = (v: string, ref: number) => !v ? 0 : v.trim().endsWith("%") ? parseFloat(v) / 100 * ref : parseFloat(v) || 0

type Uniforms = Record<string, WebGLUniformLocation | null>

export class LiquidGlass {
  static PRESETS = PRESETS

  readonly canvas: HTMLCanvasElement
  readonly failed: boolean = false
  o: Required<LiquidGlassOptions>
  private gl!: WebGLRenderingContext
  private program!: WebGLProgram
  private buffer!: WebGLBuffer
  private u: Uniforms = {}
  private tex!: WebGLTexture
  private blurTex!: WebGLTexture
  private blurC!: HTMLCanvasElement
  private items: GlassItem[] = []
  private solids: Solid[] = []
  private ptr: { x: number; y: number } | null = null
  private tilt: { g: number; b: number } | null = null
  private lastPtr = 0
  private light = { x: -400, y: -600 }
  private fit = [1, 1, 0, 0]
  private size = { w: 0, h: 0 }
  private src: Source | null = null
  private live = false
  private dirty = false
  private ready = false
  private raf = 0
  private frames = 0
  private nextId = 1
  private bG = new Float32Array(MAXG * 4); private bGP = new Float32Array(MAXG * 4); private bGT = new Float32Array(MAXG * 4)
  private bS = new Float32Array(MAXS * 4); private bSC = new Float32Array(MAXS * 4); private bSP = new Float32Array(MAXS * 4)

  constructor(canvas: HTMLCanvasElement, opts: LiquidGlassOptions = {}) {
    this.canvas = canvas
    this.o = { refraction: 28, dispersion: 0.1, frost: 14, bezel: 26, mergeK: 40, mode: "light", liquid: true, ...opts }
    const gl = canvas.getContext("webgl", { antialias: false })
    if (!gl || gl.isContextLost()) { this.failed = true; console.warn("LiquidGlass: WebGL unavailable"); return }
    this.gl = gl
    const sh = (t: number, s: string) => {
      const o = gl.createShader(t)!
      gl.shaderSource(o, s); gl.compileShader(o)
      if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(o))
      return o
    }
    const pr = gl.createProgram()!
    const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS)
    gl.attachShader(pr, vs); gl.attachShader(pr, fs)
    gl.linkProgram(pr)
    gl.deleteShader(vs); gl.deleteShader(fs)
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) {
      console.error("LiquidGlass:", gl.getProgramInfoLog(pr))
      gl.deleteProgram(pr); this.failed = true; return
    }
    gl.useProgram(pr); this.program = pr
    const b = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, b); this.buffer = b
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    ;["uTex", "uBlur", "uRes", "uFit", "uGN", "uSN", "uBezel", "uStrength", "uDisp", "uMergeK", "uDark", "uPtr"].forEach(n => this.u[n] = gl.getUniformLocation(pr, n))
    ;["uG", "uGP", "uGT", "uS", "uSC", "uSP"].forEach(n => this.u[n] = gl.getUniformLocation(pr, n + "[0]"))
    this.tex = this._tex(0); this.blurTex = this._tex(1)
    gl.uniform1i(this.u.uTex, 0); gl.uniform1i(this.u.uBlur, 1)
    this.blurC = document.createElement("canvas")
    window.addEventListener("pointermove", this._onPtr)
    window.addEventListener("pointerup", this._onUp)
    window.addEventListener("pointercancel", this._onUp)
    window.addEventListener("deviceorientation", this._onTilt)
    this.raf = requestAnimationFrame(this._loop)
  }

  private _onPtr = (e: PointerEvent) => { this.ptr = { x: e.clientX, y: e.clientY }; this.lastPtr = performance.now() }
  private _onUp = () => this.items.forEach(i => { if (!i.held) i.pressed = false })
  private _onTilt = (e: DeviceOrientationEvent) => {
    if (e.gamma != null && e.beta != null && performance.now() - this.lastPtr > 3000) { this.tilt = { g: e.gamma, b: e.beta }; this.ptr = null }
  }
  private _loop = () => { this._frame(); this.raf = requestAnimationFrame(this._loop) }

  private _tex(unit: number) {
    const gl = this.gl, t = gl.createTexture()!
    gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    return t
  }

  set(o: LiquidGlassOptions) {
    const f = this.o.frost
    Object.assign(this.o, o)
    if (o.frost !== undefined && o.frost !== f) this.dirty = true
  }

  setSource(src: Source, { live }: { live?: boolean } = {}) {
    this.src = src
    this.live = live ?? (typeof HTMLVideoElement !== "undefined" && src instanceof HTMLVideoElement)
    this.dirty = true
  }

  invalidate() { this.dirty = true }

  scan(rootEl: ParentNode) {
    // Drop elements that left the page or no longer ask for glass (a variant or webgl change).
    const keep = (el: HTMLElement, attr: string) => el.isConnected && el.hasAttribute(attr)
    this.items.filter(i => !keep(i.el, "data-glass")).forEach(i => this._detach(i))
    this.items = this.items.filter(i => keep(i.el, "data-glass"))
    this.solids.filter(s => s.live && !keep(s.el, "data-glass-solid")).forEach(s => { s.el.style.opacity = s.opacity })
    this.solids = this.solids.filter(s => keep(s.el, "data-glass-solid"))
    rootEl.querySelectorAll<HTMLElement>("[data-glass]").forEach(el => this.add(el))
    rootEl.querySelectorAll<HTMLElement>("[data-glass-solid]").forEach(el => this.addSolid(el))
    this.refreshOcclusion()
  }

  /** Links each item to its closest glass ancestor (nested glass is drawn on the top layer) and
      blocks items under any other ancestor that paints: the canvas is behind it. Backgrounds
      change with state and theme, so the frame loop calls this periodically too. */
  refreshOcclusion() {
    const byEl = new Map(this.items.map(i => [i.el as Element, i]))
    const link = (x: { el: HTMLElement; parent: GlassItem | null; blocked: boolean; clips: Element[] }) => {
      x.parent = null
      x.blocked = false
      x.clips = []
      for (let p = x.el.parentElement; p && p !== document.body; p = p.parentElement) {
        const cs = getComputedStyle(p)
        if (clipsContent(cs)) x.clips.push(p)
        const g = byEl.get(p)
        if (g) { x.parent ??= g; continue }
        if (paintsOverBackdrop(cs)) { x.blocked = true; break }
      }
    }
    this.items.forEach(link)
    this.solids.forEach(link)
  }

  add(el: HTMLElement, opts: Partial<GlassShape> & { preset?: GlassPreset } = {}) {
    const existing = this.items.find(i => i.el === el)
    if (existing) return existing
    const d = el.dataset, pre = PRESETS[(opts.preset || d.glass) as GlassPreset] || PRESETS.bar
    const ov: Partial<GlassShape> = {}
    ;(["tint", "frost", "layer", "merge", "grow", "squash"] as const).forEach(k => { if (d[k] !== undefined) ov[k] = parseFloat(d[k]!) })
    const it = {
      ...pre, ...ov, ...opts,
      el, sx: 1, sy: 1, vx: 0, vy: 0, v: { x: 0, y: 0 }, last: null, pressed: false, held: false, scs: "", t: 0,
      id: this.nextId++, parent: null, blocked: false, clips: [], live: false,
      down: () => { it.pressed = true },
    } as GlassItem
    it.t = it.tint
    el.addEventListener("pointerdown", it.down)
    this.items.push(it)
    return it
  }

  addSolid(el: HTMLElement) {
    if (this.solids.some(s => s.el === el)) return
    this.solids.push({ el, layer: parseFloat(el.dataset.layer || "0"), opacity: el.style.opacity, live: false, parent: null, blocked: false, clips: [] })
  }

  press(el: HTMLElement, on: boolean) {
    const it = this.items.find(i => i.el === el)
    if (it) { it.pressed = on; it.held = on }
  }

  remove(el: HTMLElement) {
    const it = this.items.find(i => i.el === el)
    if (it) this._detach(it)
    const s = this.solids.find(s => s.el === el)
    if (s?.live) el.style.opacity = s.opacity
    this.items = this.items.filter(i => i.el !== el)
    this.solids = this.solids.filter(s => s.el !== el)
  }

  /** Stops rendering and releases GL resources. The canvas stays usable, so a remount
      (React strict mode, HMR) can create a new engine on the same element. */
  destroy() {
    cancelAnimationFrame(this.raf)
    document.documentElement.classList.remove("lg-ready")
    window.removeEventListener("pointermove", this._onPtr); window.removeEventListener("pointerup", this._onUp)
    window.removeEventListener("pointercancel", this._onUp); window.removeEventListener("deviceorientation", this._onTilt)
    this.items.forEach(i => this._detach(i))
    this.solids.forEach(s => { if (s.live) s.el.style.opacity = s.opacity })
    this.items = []; this.solids = []
    const gl = this.gl
    if (gl && !this.failed) {
      gl.deleteTexture(this.tex); gl.deleteTexture(this.blurTex)
      gl.deleteBuffer(this.buffer); gl.deleteProgram(this.program)
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT)
    }
  }

  private _detach(it: GlassItem) {
    it.el.removeEventListener("pointerdown", it.down)
    this._setLive(it, false)
  }

  /* data-glass-live marks elements the shader draws this frame; only those drop their CSS glass. */
  private _setLive(it: GlassItem, live: boolean) {
    if (it.live === live) return
    it.live = live
    if (live) it.el.setAttribute("data-glass-live", "")
    else { it.el.removeAttribute("data-glass-live"); it.el.style.scale = ""; it.scs = ""; it.sx = it.sy = 1; it.vx = it.vy = 0 }
  }

  private _upload(W: number, H: number) {
    const gl = this.gl, s = this.src!
    if (s instanceof HTMLVideoElement && s.readyState < 2) return
    const sw = (s as HTMLVideoElement).videoWidth || (s as HTMLImageElement).naturalWidth || s.width
    const sh = (s as HTMLVideoElement).videoHeight || (s as HTMLImageElement).naturalHeight || s.height
    if (!sw || !sh) return
    const A = W / H, B = sw / sh
    let fx = 1, fy = 1, ox = 0, oy = 0
    if (B > A) { fx = A / B; ox = (1 - fx) / 2 } else { fy = B / A; oy = (1 - fy) / 2 }
    this.fit = [fx, fy, ox, oy]
    try {
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, s)
      const bc = this.blurC, bw = Math.max(2, Math.round(W / 4)), bh = Math.max(2, Math.round(H / 4))
      if (bc.width !== bw) bc.width = bw
      if (bc.height !== bh) bc.height = bh
      const x = bc.getContext("2d")!, br = Math.max(this.o.frost / 4, 0.01), pad = br * 3
      x.filter = `blur(${br}px)`
      x.drawImage(s, ox * sw, oy * sh, fx * sw, fy * sh, -pad, -pad, bw + 2 * pad, bh + 2 * pad)
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.blurTex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bc)
      this.ready = true
      // The canvas now shows the backdrop (drawn later this same frame), so DOM copies of it marked
      // data-glass-backdrop can step aside: they sit above the canvas and would hide the glass.
      document.documentElement.classList.add("lg-ready")
    } catch (e) { console.warn("LiquidGlass: source not usable (CORS?)", e) }
    this.dirty = false
  }

  private _frame() {
    const gl = this.gl, cv = this.canvas
    const W = cv.clientWidth, H = cv.clientHeight
    if (!W || !H) return
    const cr = cv.getBoundingClientRect(), k = W / cr.width
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5), bw = Math.round(W * dpr), bh = Math.round(H * dpr)
    if (cv.width !== bw || cv.height !== bh) { cv.width = bw; cv.height = bh }
    gl.viewport(0, 0, bw, bh)
    // The cover-fit and the downscaled blur both depend on the viewport size.
    if (W !== this.size.w || H !== this.size.h) { this.size = { w: W, h: H }; this.dirty = true }
    if (this.src && (this.dirty || this.live)) this._upload(W, H)
    if (!this.ready) return
    if (++this.frames % 30 === 0) this.refreshOcclusion()
    let tx = -W * 0.2, ty = -H * 0.6
    if (this.ptr) { tx = (this.ptr.x - cr.left) * k; ty = (this.ptr.y - cr.top) * k }
    else if (this.tilt) { tx = W / 2 + this.tilt.g / 30 * W; ty = H / 2 + (this.tilt.b - 45) / 30 * H }
    this.light.x += (tx - this.light.x) * 0.12; this.light.y += (ty - this.light.y) * 0.12
    const dark = this.o.mode === "dark", liquid = this.o.liquid
    type Vis = { it: GlassItem; r: DOMRect; cs: CSSStyleDeclaration }
    const vis = new Map<number, Vis>()
    const cands: ShapeCandidate[] = []
    for (const it of this.items) {
      const el = it.el
      if (!el.isConnected || it.blocked) continue
      const r = el.getBoundingClientRect()
      if (r.width < 1 || r.height < 1) continue
      if (r.bottom < cr.top - 40 || r.top > cr.bottom + 40 || r.right < cr.left - 40 || r.left > cr.right + 40) continue
      // Partly scrolled out of its container: the DOM clips its CSS glass, the shader would not.
      if (it.clips.length && !insideClips(r, it.clips.map(c => c.getBoundingClientRect()))) continue
      const cs = getComputedStyle(el)
      if (cs.visibility === "hidden") continue
      vis.set(it.id, { it, r, cs })
      cands.push({ id: it.id, parent: it.parent?.id ?? null, area: r.width * r.height })
    }
    const chosen = selectShapes(cands, MAXG)
    for (const it of this.items) this._setLive(it, chosen.has(it.id))
    let n = 0
    for (const [id, depth] of chosen) {
      const { it, r, cs } = vis.get(id)!
      const el = it.el
      const op = effectiveOpacity(el)
      const cx = (r.left + r.width / 2 - cr.left) * k, cy = (r.top + r.height / 2 - cr.top) * k
      const hx = r.width / 2 * k / it.sx, hy = r.height / 2 * k / it.sy
      if (it.last) { it.v.x = it.v.x * 0.6 + (cx - it.last.x) * 0.4; it.v.y = it.v.y * 0.6 + (cy - it.last.y) * 0.4 }
      it.last = { x: cx, y: cy }
      const g = it.pressed && liquid ? 1 + it.grow : 1, sq = liquid ? it.squash : 0
      const ax = Math.abs(it.v.x), ay = Math.abs(it.v.y)
      const tX = g * (1 + Math.min(ax * 0.018 * sq, 0.35) - Math.min(ay * 0.009 * sq, 0.18))
      const tY = g * (1 + Math.min(ay * 0.018 * sq, 0.35) - Math.min(ax * 0.009 * sq, 0.18))
      if (liquid) { it.vx = (it.vx + (tX - it.sx) * 0.22) * 0.7; it.sx += it.vx; it.vy = (it.vy + (tY - it.sy) * 0.22) * 0.7; it.sy += it.vy }
      else { it.sx = tX; it.sy = tY; it.vx = it.vy = 0 }
      const scs = Math.abs(it.sx - 1) < 0.002 && Math.abs(it.sy - 1) < 0.002 ? "" : `${it.sx.toFixed(4)} ${it.sy.toFixed(4)}`
      if (scs !== it.scs) { el.style.scale = scs; it.scs = scs }
      const Hx = hx * it.sx, Hy = hy * it.sy, ow = el.offsetWidth || r.width
      const rad = Math.min(len(cs.borderTopLeftRadius, ow) * (hx * 2 / ow) * Math.min(it.sx, it.sy), Hx, Hy)
      const tt = it.pressed && it.tintPressed !== undefined ? it.tintPressed : it.tint
      it.t += (tt - it.t) * 0.2
      const tv = cs.getPropertyValue("--lg-tint").trim()
      const custom = tv && tv !== "transparent" ? parseColor(tv) : null
      const tc: [number, number, number] = it.tintColor || (custom ? [custom[0], custom[1], custom[2]] : dark ? [0.07, 0.07, 0.09] : [1, 1, 1])
      const layer = Math.max(depth, it.layer >= 1 ? 1 : 0)
      this.bG.set([cx, cy, Hx, Hy], n * 4)
      this.bGP.set([rad, layer >= 1 ? 2 : (it.merge ? 1 : 0), it.t, it.frost], n * 4)
      this.bGT.set([tc[0], tc[1], tc[2], op], n * 4)
      n++
    }
    let m = 0
    for (const s of this.solids) {
      const el = s.el
      const r = el.isConnected ? el.getBoundingClientRect() : null
      // Only paint a solid into the scene where the canvas is visible, as for glass.
      const draw = m < MAXS && !s.blocked && (!s.parent || s.parent.live) && !!r && r.width >= 1 && r.height >= 1
        && (!s.clips.length || insideClips(r, s.clips.map(c => c.getBoundingClientRect())))
      if (draw !== s.live) { s.live = draw; el.style.opacity = draw ? "0" : s.opacity }
      if (!draw) continue
      const cs = getComputedStyle(el), hx = r!.width / 2 * k, hy = r!.height / 2 * k, ow = el.offsetWidth || r!.width
      this.bS.set([(r!.left + r!.width / 2 - cr.left) * k, (r!.top + r!.height / 2 - cr.top) * k, hx, hy], m * 4)
      this.bSC.set(parseColor(cs.backgroundColor), m * 4)
      this.bSP.set([Math.min(len(cs.borderTopLeftRadius, ow) * (hx * 2 / ow), hx, hy), s.layer, 0, 0], m * 4)
      m++
    }
    const u = this.u, o = this.o
    gl.uniform2f(u.uRes, W, H); gl.uniform4fv(u.uFit, this.fit)
    gl.uniform4fv(u.uG, this.bG); gl.uniform4fv(u.uGP, this.bGP); gl.uniform4fv(u.uGT, this.bGT); gl.uniform1i(u.uGN, n)
    gl.uniform4fv(u.uS, this.bS); gl.uniform4fv(u.uSC, this.bSC); gl.uniform4fv(u.uSP, this.bSP); gl.uniform1i(u.uSN, m)
    gl.uniform1f(u.uBezel, o.bezel); gl.uniform1f(u.uStrength, o.refraction); gl.uniform1f(u.uDisp, o.dispersion)
    gl.uniform1f(u.uMergeK, Math.max(o.mergeK, 0.001)); gl.uniform1f(u.uDark, dark ? 1 : 0)
    gl.uniform2f(u.uPtr, this.light.x, this.light.y)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
}

export default LiquidGlass
