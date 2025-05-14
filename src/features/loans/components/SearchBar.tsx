
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar = ({ searchTerm, onSearch }: SearchBarProps) => {
  return (
    <div className="flex items-center">
      <Input
        type="search"
        placeholder="Buscar por livro, autor ou usuário..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};

export default SearchBar;
