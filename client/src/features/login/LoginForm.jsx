import React, { useContext, useState } from 'react';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { UserContext } from '../../index';
import { ModeToggle } from 'shared/lib/modeToggle';
import { Sheet } from '@mui/joy';

function LoginForm() {
  const { userStore } = useContext(UserContext);
  const [input, setInput] = useState({});

  const inputHandler = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = () => {
    userStore.login(input);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center' }}>
      <Sheet
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 50, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        // variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body2">Ligin in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            // html input attribute
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            value={input.email || ''}
            onChange={inputHandler}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            // html input attribute
            name="password"
            type="password"
            placeholder="password"
            value={input.password || ''}
            onChange={inputHandler}
          />
        </FormControl>

        <Button type="submit" onClick={submitHandler} sx={{ mt: 1 /* margin top */ }}>
          Login
        </Button>

        <Typography
          endDecorator={<NavLink to="/signup">Signup</NavLink>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Have&apos;t got an account?
        </Typography>
      </Sheet>{' '}
    </div>

    // </div>
  );
}

export default observer(LoginForm);
