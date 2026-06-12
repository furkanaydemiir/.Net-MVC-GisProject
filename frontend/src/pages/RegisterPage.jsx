import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { userRequests } from '../Data/data';
import { toast } from 'sonner';

function RegisterPage() {
    const navigate = useNavigate();
  const { control, handleSubmit, reset,formState: { errors } } = useForm({
    defaultValues: {
      UserName: '',
      UserPassword: ''
    }
  });

  const onSubmit = async(data) => {
    try {
        const response = await userRequests.addUser(data);
        console.log(response.data);
        toast.success("Kullanıcı Başarıyla Oluşturuldu");
        
        reset();
        navigate("/login");
        
    } catch (error) {
        toast.error(`Kullanıcı oluşturlamadı: ${error.response.data.message}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%", height: "100dvh", display: "flex", justifyContent: "center" }}>
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4, width: '300px' }}>
        
        <Controller
          name="UserName"
          control={control}
          rules={{ required: "İsim alanı boş bırakılamaz." }} 
          render={({ field }) => (
            <TextField
              {...field}
              type='text'
              variant='outlined'
              label="İsminizi Giriniz."
              error={!!errors.UserName} 
              helperText={errors.UserName?.message} 
            />
          )}
        />

        <Controller
          name="UserPassword"
          control={control}
          rules={{ 
            required: "Şifre alanı boş bırakılamaz.",
            minLength: { value: 6, message: "Şifre en az 6 karakter olmalıdır." }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type='password'
              variant='outlined'
              label="Şifrenizi Oluşturun."
              error={!!errors.UserPassword}
              helperText={errors.UserPassword?.message}
            />
          )}
        />

        <Button color='success' type='submit' variant='contained'>Kayıt Ol</Button>
        <Button to="/login" color='secondary' component={Link} variant='contained'>Zaten hesabınız var mı? Giriş yapın.</Button>
      </Box>
    </Box>
  )
}

export default RegisterPage;