export interface Certificates {
  certificate_id: number;
  user_id: number;
  course_id: number;
  issued_at: string;
  metadata: CertificateMetadata;
  revoked: boolean;
}

export interface CertificateMetadata {
  grade?: string;
  comments?: string;
}