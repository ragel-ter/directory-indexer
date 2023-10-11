export interface DirectoryEntryResponse {
  name: string,
  path: string,
  is_directory: boolean,
  file_ext: string,
  file_size: number,
  file_created: string,
  file_permissions: string
}
