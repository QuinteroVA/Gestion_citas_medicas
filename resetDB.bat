@'
{
  "users": [
    {
      "id": "admin-1",
      "username": "admin",
      "password": "admin",
      "role": "admin"
    }
  ],
  "appointments": [],
  "specialties": [],
  "doctors": [],
  "hasChangedAdminCredentials": false
}
'@ | Set-Content -Path .\data\db.json -Encoding UTF8