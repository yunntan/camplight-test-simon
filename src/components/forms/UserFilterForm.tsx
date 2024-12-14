import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '../ui/form';

// Define the Zod schema for validation
const userSearchFormSchema = z.object({
  name: z.string().optional(),
});

export type TUserSearchFormSchema = z.infer<typeof userSearchFormSchema>;

// Define the React component
interface SearchFormProps {
  onSubmitForm: (data: TUserSearchFormSchema) => void;
  disabled: boolean;
}

export const UserFilterForm: React.FC<SearchFormProps> = ({
  onSubmitForm,
  disabled,
}) => {
  const form = useForm<TUserSearchFormSchema>({
    resolver: zodResolver(userSearchFormSchema),
    mode: 'onChange',
    defaultValues: { name: '' },
  });

  const onSubmit = (d: TUserSearchFormSchema) => {
    onSubmitForm(d);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Search by name..." {...field} />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <Button type="submit" disabled={disabled}>
            Filter
          </Button>
        </div>
      </form>
    </Form>
  );
};
