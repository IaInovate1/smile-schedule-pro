
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o Supabase está configurado
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      setIsSupabaseConfigured(false);
      toast.error("Configuração do Supabase incompleta", {
        description: "As variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY precisam ser configuradas."
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!isSupabaseConfigured) {
        throw new Error("Configuração do Supabase incompleta");
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      toast.success("Login realizado com sucesso!");
      navigate("/appointments");
    } catch (error: any) {
      console.error("Erro no login:", error);
      toast.error("Erro ao fazer login", {
        description: error.message || "Verifique suas credenciais e tente novamente."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-purple-900">
            Smile Schedule Pro
          </CardTitle>
          <CardDescription className="text-center">
            {isSupabaseConfigured 
              ? "Entre com suas credenciais para acessar o sistema" 
              : "Configuração do Supabase necessária"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="dentista@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700" 
              disabled={isLoading || !isSupabaseConfigured}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
        {!isSupabaseConfigured && (
          <CardFooter className="flex justify-center">
            <p className="text-sm text-red-500">
              É necessário configurar as variáveis de ambiente do Supabase.
              Verifique a documentação e adicione as variáveis no painel do Supabase.
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Login;
