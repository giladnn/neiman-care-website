export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string | null
          date: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          reason: string
          status: string | null
          time: string
        }
        Insert: {
          created_at?: string | null
          date: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          reason: string
          status?: string | null
          time: string
        }
        Update: {
          created_at?: string | null
          date?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          reason?: string
          status?: string | null
          time?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string | null
          date: string
          excerpt: string
          id: string
          image_url: string | null
          title: string
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string | null
          date: string
          excerpt: string
          id?: string
          image_url?: string | null
          title: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string | null
          date?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          title?: string
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string
          order_num: number | null
          type: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: string
          order_num?: number | null
          type: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: string
          order_num?: number | null
          type?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          read: boolean | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          read?: boolean | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          read?: boolean | null
          subject?: string | null
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          created_at: string | null
          date: string
          excerpt: string
          id: string
          imageUrl: string | null
          source: string
          title: string
          url: string
        }
        Insert: {
          created_at?: string | null
          date: string
          excerpt: string
          id?: string
          imageUrl?: string | null
          source: string
          title: string
          url: string
        }
        Update: {
          created_at?: string | null
          date?: string
          excerpt?: string
          id?: string
          imageUrl?: string | null
          source?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      patient_stories: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          diagnosis: string | null
          featured: boolean | null
          full_story: string
          id: string
          image_url: string | null
          name: string
          position: string | null
          rating: number
          treatment_journey: string | null
          video_url: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          diagnosis?: string | null
          featured?: boolean | null
          full_story: string
          id?: string
          image_url?: string | null
          name: string
          position?: string | null
          rating: number
          treatment_journey?: string | null
          video_url?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          diagnosis?: string | null
          featured?: boolean | null
          full_story?: string
          id?: string
          image_url?: string | null
          name?: string
          position?: string | null
          rating?: number
          treatment_journey?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          createdAt: string | null
          description: string
          icon: string | null
          id: string
          imageUrl: string | null
          title: string
        }
        Insert: {
          createdAt?: string | null
          description: string
          icon?: string | null
          id?: string
          imageUrl?: string | null
          title: string
        }
        Update: {
          createdAt?: string | null
          description?: string
          icon?: string | null
          id?: string
          imageUrl?: string | null
          title?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          name: string
          position: string | null
          rating: number
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          name: string
          position?: string | null
          rating: number
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          name?: string
          position?: string | null
          rating?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          created_at: string | null
          id: string
          source: string
          thumbnail: string | null
          title: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          source: string
          thumbnail?: string | null
          title: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          source?: string
          thumbnail?: string | null
          title?: string
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
