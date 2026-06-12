import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { userRequests } from '../Data/data';
import { toast } from 'sonner';

function LoginPage() {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      UserName: '',
      UserPassword: ''
    }
  });

  const onSubmit = async(data) => {
    try {
      const response = await userRequests.login(data);
      localStorage.setItem("token",response.data.token)
      toast.success("Giriş başarılı");
      navigate("/");
    } catch (error) {
      console.error("Giriş hatası",error);
      if(error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message);
      }else{
        toast.error("Yanlış kullanıcı adı veya şifre");
      }
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
              error={!!errors.userName} 
              helperText={errors.userName?.message} 
            />
          )}
        />

        <Controller
          name="UserPassword"
          control={control}
          rules={{ 
            required: "Şifre alanı boş bırakılamaz.",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type='password'
              variant='outlined'
              label="Şifrenizi Giriniz."
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        <Button type='submit' variant='contained'>Giriş Yap</Button>
        <Button  to="/register" component={Link} variant='contained'>Hesabınız yoksa kaydolmak için tıklayın.</Button>
      </Box>
      
    </Box>
  )
}

export default LoginPage