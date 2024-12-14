'use client';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { PiWarning } from 'react-icons/pi';
import { z } from 'zod';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Spinner } from '../ui/spinner';

type UserFormProps = {
  defaultValues?: Omit<User, 'id' | 'imageId'>;
  onSubmitForm?: (userData: TUserFormSchema) => Promise<void>;
  allowEditAfterSuccessfullSave?: boolean;
};

const userFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^\d+$/, 'Phone number must contain only numbers')
    .optional() // Optional, if present, must match the regex
    .nullable(),
});

export type TUserFormSchema = z.infer<typeof userFormSchema>;

const UserForm = ({
  onSubmitForm = async () => {},
  defaultValues = {
    name: '',
    email: '',
    phone: '',
  },
  allowEditAfterSuccessfullSave = true,
}: UserFormProps) => {
  const form = useForm<TUserFormSchema>({
    resolver: zodResolver(userFormSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const onSubmit = async (d: TUserFormSchema) => {
    try {
      await onSubmitForm(d);
    } catch (e: any) {
      form.setError('root', {
        message: 'Something went wrong, please try again later',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md">
        <fieldset
          disabled={
            form.formState.isSubmitting ||
            (form.formState.isSubmitSuccessful &&
              !allowEditAfterSuccessfullSave)
          }
          className="space-y-4"
        >
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone number"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button>Save</Button>
            <Spinner
              className={cn({
                hidden: !form.formState.isSubmitting,
              })}
              size="small"
            />
            <Button asChild={true} variant="link" className="ml-auto">
              <Link
                href="/"
                className={cn({
                  'pointer-events-none text-stone-400/50':
                    form.formState.isSubmitting,
                })}
                tabIndex={form.formState.isSubmitting ? -1 : 0}
              >
                Cancel
              </Link>
            </Button>
          </div>
          {form.formState.errors?.['root'] && (
            <Alert variant="destructive">
              <PiWarning className="size-4" />
              <AlertTitle>Ooooooops!</AlertTitle>
              <AlertDescription className="break-all">
                {form.formState.errors?.['root'].message}
              </AlertDescription>
            </Alert>
          )}
          {form.formState.isSubmitSuccessful && (
            <Alert variant="success">
              <MdOutlineEmail className="size-4" />
              <AlertTitle>New user successfull created.</AlertTitle>
              <AlertDescription>
                <Button variant="link" asChild={true} className="!p-0">
                  <Link href="/">
                    <span>Back to home</span>
                    <FaArrowRight />
                  </Link>
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </fieldset>
      </form>
    </Form>
  );
};

export { UserForm };
