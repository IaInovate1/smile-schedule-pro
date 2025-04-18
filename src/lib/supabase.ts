
import { createClient } from '@supabase/supabase-js';

// Obter as variáveis do ambiente ou usar valores vazios que serão preenchidos pelo usuário
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Verificar se as variáveis estão definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Erro: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY são necessários. ' +
    'Por favor, adicione-os às variáveis de ambiente ou configure-os no painel do Supabase.'
  );
}

// Criar cliente apenas se as variáveis estiverem definidas
let supabaseClient;

try {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.error('Erro ao criar cliente Supabase:', error);
  // Criar um objeto mock para evitar erros de runtime
  supabaseClient = {
    auth: {
      signInWithPassword: async () => ({ error: { message: 'Configuração do Supabase incompleta' } }),
      signOut: async () => ({ error: null }),
    },
  };
}

export const supabase = supabaseClient;
