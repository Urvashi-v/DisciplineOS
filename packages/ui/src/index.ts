/**
 * @disciplineos/ui — the shared design system.
 *
 * Framework-agnostic React primitives built on Tailwind + `cva` variants. The
 * Next.js app consumes this package source directly via `transpilePackages`.
 */
export { Avatar, type AvatarProps } from './components/avatar';
export { Badge, type BadgeProps, badgeVariants } from './components/badge';
export { Button, type ButtonProps, buttonVariants } from './components/button';
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/card';
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './components/dialog';
export { EmptyState, type EmptyStateProps } from './components/empty-state';
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from './components/form';
export { Input } from './components/input';
export { Label } from './components/label';
export { Progress, type ProgressProps } from './components/progress';
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/select';
export { Skeleton } from './components/skeleton';
export { Spinner, type SpinnerProps } from './components/spinner';
export { Textarea } from './components/textarea';
export { cn } from './lib/cn';
