import type { InstitutionType, InstRole } from "./enums";

export interface Institutions {
  institution_id: number;
  owner_user_id: number;
  institution_name: string;
  institution_avatar: string;
  institution_type: InstitutionType;
  institution_desc: string;
  metadata: InstitutionMetadata;
  created_at: string;
  updated_at: string;
}

export interface InstitutionMembers {
  inst_member_id: number;
  institution_id: number;
  user_id: number;
  role_in_institution: InstRole;
  joined_at: string;
}

export interface InstitutionMetadata {
  founded?: number;
  city?: string;
  website?: string;
  [key: string]: string | number | undefined;
}