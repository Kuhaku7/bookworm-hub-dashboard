
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types';

interface UserFormProps {
  newUser: Partial<User>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserForm = ({ newUser, onInputChange }: UserFormProps) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nome
        </Label>
        <Input
          id="name"
          name="name"
          value={newUser.name || ''}
          onChange={onInputChange}
          className="col-span-3"
          placeholder="Nome completo"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={newUser.email || ''}
          onChange={onInputChange}
          className="col-span-3"
          placeholder="email@exemplo.com"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="is_active" className="text-right">
          Status
        </Label>
        <div className="col-span-3 flex items-center">
          <Input
            id="is_active"
            name="is_active"
            type="checkbox"
            checked={newUser.is_active}
            onChange={onInputChange}
            className="h-4 w-4"
          />
          <span className="ml-2 text-sm">Usuário ativo</span>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
