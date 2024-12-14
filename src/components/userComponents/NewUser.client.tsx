'use client';

import { createNewUser } from '@/app/action/userActions/createNewUser';
import { TUserFormSchema, UserForm } from '../forms/UserForm.client';

const NewUser = () => {
  const onSubmitNewUser = async (d: TUserFormSchema) => {
    await createNewUser(d);
  };

  return (
    <div>
      <div>
        <h1 className="text-xl">New User</h1>
      </div>
      <UserForm
        onSubmitForm={onSubmitNewUser}
        allowEditAfterSuccessfullSave={false}
      />
    </div>
  );
};

export { NewUser };
