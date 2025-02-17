export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string;
          name: string | null;
          private_key: string;
          proxy_id: string | null;
          public_address: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          private_key: string;
          proxy_id?: string | null;
          public_address: string;
          user_id: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          private_key?: string;
          proxy_id?: string | null;
          public_address?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_accounts_proxy_id_fkey';
            columns: ['proxy_id'];
            isOneToOne: false;
            referencedRelation: 'proxies';
            referencedColumns: ['id'];
          },
        ];
      };
      collections: {
        Row: {
          chain_identifier: string;
          chain_name: string;
          created_at: string;
          id: string;
          imageUrl: string | null;
          importanceWeight: number;
          isVerified: boolean;
          name: string;
          slug: string | null;
        };
        Insert: {
          chain_identifier: string;
          chain_name: string;
          created_at?: string;
          id: string;
          imageUrl?: string | null;
          importanceWeight: number;
          isVerified: boolean;
          name: string;
          slug?: string | null;
        };
        Update: {
          chain_identifier?: string;
          chain_name?: string;
          created_at?: string;
          id?: string;
          imageUrl?: string | null;
          importanceWeight?: number;
          isVerified?: boolean;
          name?: string;
          slug?: string | null;
        };
        Relationships: [];
      };
      logs: {
        Row: {
          created_at: string;
          id: number;
          text: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          text?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          text?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      proxies: {
        Row: {
          host: string | null;
          id: string;
          password: string | null;
          port: string | null;
          user_id: string;
          username: string | null;
        };
        Insert: {
          host?: string | null;
          id?: string;
          password?: string | null;
          port?: string | null;
          user_id: string;
          username?: string | null;
        };
        Update: {
          host?: string | null;
          id?: string;
          password?: string | null;
          port?: string | null;
          user_id?: string;
          username?: string | null;
        };
        Relationships: [];
      };
      task: {
        Row: {
          account: string;
          created_at: string;
          id: string;
          interval: number;
          type: number;
        };
        Insert: {
          account: string;
          created_at?: string;
          id: string;
          interval: number;
          type: number;
        };
        Update: {
          account?: string;
          created_at?: string;
          id?: string;
          interval?: number;
          type?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'task_account_fkey';
            columns: ['account'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
