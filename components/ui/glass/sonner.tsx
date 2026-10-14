"use client"

import * as React from "react"
import { Toaster as BaseToaster } from "@/components/ui/sonner"

/**
 * Glass UI Toaster - Toast notifications with glassmorphism effects
 * 
 * The Toaster component automatically uses glass effects for all toast notifications.
 * Toasts will have:
 * - Glass background with backdrop blur
 * - Glass borders and shadows
 * - Color-coded borders for different toast types (success, error, warning, info)
 * - Glass-styled action and cancel buttons
 * 
 * @example
 * ```tsx
 * import { Toaster } from "@/components/ui/glass"
 * import { toast } from "sonner"
 * 
 * // Add to your root layout
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <Toaster />
 *       </body>
 *     </html>
 *   )
 * }
 * 
 * // Use in your components
 * toast.success('Success!', { description: 'Action completed' })
 * toast.error('Error!', { description: 'Something went wrong' })
 * toast.warning('Warning!', { description: 'Please review' })
 * toast.info('Info', { description: 'Useful information' })
 * 
 * // Clear glass instead of the default regular glass
 * toast('Custom Toast', {
 *   description: 'With clear glass',
 *   className: 'lg-clear',
 * })
 * ```
 */
export { BaseToaster as Toaster }

