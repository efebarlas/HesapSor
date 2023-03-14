export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      canvas_templates: {
        Row: {
          canvasdata: string
          id: number
          tableid: number
        }
        Insert: {
          canvasdata: string
          id?: number
          tableid?: number
        }
        Update: {
          canvasdata?: string
          id?: number
          tableid?: number
        }
      }
      entities: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
      }
      entity_access: {
        Row: {
          entity_id: number
          id: number
          role_name: string
          user_id: string
        }
        Insert: {
          entity_id?: number
          id?: number
          role_name: string
          user_id: string
        }
        Update: {
          entity_id?: number
          id?: number
          role_name?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      table_documents: {
        Row: {
          created: string | null
          id: number
          last_updated: string | null
          table_content: Json | null
          viewablebypublic: boolean | null
        }
        Insert: {
          created?: string | null
          id?: number
          last_updated?: string | null
          table_content?: Json | null
          viewablebypublic?: boolean | null
        }
        Update: {
          created?: string | null
          id?: number
          last_updated?: string | null
          table_content?: Json | null
          viewablebypublic?: boolean | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
