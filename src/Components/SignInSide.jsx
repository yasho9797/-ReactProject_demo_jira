import * as React from 'react';
import { 
  Box, Button, Checkbox, CssBaseline, FormControlLabel, 
  TextField, Typography, Stack, Card as MuiCard, styled, Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SignInContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  padding: 20,
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--bg-primary)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-20%',
    right: '-10%',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-15%',
    left: '-5%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
}));

const GridLines = styled(Box)({
  position: 'absolute',
  inset: 0,
  backgroundImage: `
    linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
  `,
  backgroundSize: '60px 60px',
  pointerEvents: 'none',
});

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4.5),
  gap: theme.spacing(2),
  margin: 'auto',
  background: 'var(--bg-card) !important',
  border: '1px solid var(--border-medium) !important',
  borderRadius: '20px !important',
  boxShadow: 'var(--shadow-elevated), var(--glow-primary) !important',
  backdropFilter: 'blur(20px)',
  animation: 'fadeInUp 0.6s ease forwards',
  [theme.breakpoints.up('sm')]: {
    width: '420px',
  },
}));

const StyledButton = styled(Button)({
  background: 'linear-gradient(135deg, #6366f1, #8b5cf6) !important',
  border: 'none !important',
  borderRadius: '10px !important',
  fontFamily: "'Heebo', sans-serif !important",
  fontWeight: '700 !important',
  fontSize: '1rem !important',
  padding: '12px !important',
  letterSpacing: '0.03em !important',
  boxShadow: '0 4px 20px rgba(99, 102, 241, 0.35) !important',
  transition: 'all 0.25s ease !important',
  '&:hover': {
    filter: 'brightness(1.12)',
    boxShadow: '0 8px 30px rgba(99, 102, 241, 0.5) !important',
    transform: 'translateY(-2px)',
  },
});

const LogoBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  background: 'rgba(99,102,241,0.1)',
  border: '1px solid rgba(99,102,241,0.25)',
  borderRadius: '100px',
  padding: '6px 16px',
  marginBottom: '24px',
  fontSize: '0.8rem',
  color: '#818cf8',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});



export default function SignInSide() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = user.user ? user.user : user;
    if (userData && email === userData.name && password === userData.password) {
      navigate('/AllProject');
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <CssBaseline />
      <GridLines />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{
            width: '100%',
            fontFamily: 'Heebo, sans-serif',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(239,68,68,0.3)',
          }}
        >
          שגיאה: האימייל או הסיסמה לא נכונים
        </Alert>
      </Snackbar>

      <Stack
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{
          justifyContent: 'center',
          gap: { xs: 6, sm: 10 },
          height: '100%',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
       
        <Box sx={{ maxWidth: '460px', textAlign: { xs: 'center', md: 'right' }, animation: 'fadeInUp 0.5s ease forwards' }}>
          <LogoBadge>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
            מערכת ניהול פרויקטים
          </LogoBadge>

          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              fontFamily: 'Heebo, sans-serif',
              fontSize: { xs: '2.4rem', md: '3.2rem' },
              lineHeight: 1.15,
              background: 'linear-gradient(135deg, #f1f5f9 30%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 2,
            }}
          >
            ברוכים הבאים
          </Typography>

          <Typography
            sx={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              fontFamily: 'Heebo, sans-serif',
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            מערכת לניהול פרויקטים בדרך הנוחה והקלה.
            <br />
            הפיקו את מירב התועלת מכל פרויקט.
          </Typography>

    
          <Stack direction="row" spacing={1.5} sx={{ mt: 3, flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'center', md: 'flex-end' } }}>
            {['לוח קנבן', 'ניהול משימות', 'עדיפויות'].map((label) => (
              <Box
                key={label}
                sx={{
                  px: 2, py: 0.75,
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '100px',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'Heebo, sans-serif',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {label}
              </Box>
            ))}
          </Stack>
        </Box>

      
        <Card variant="outlined">
          <Box sx={{ mb: 1, textAlign: 'center' }}>
            <Box sx={{
              width: 48, height: 48, borderRadius: '14px', mx: 'auto', mb: 2,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(99,102,241,0.35)',
              fontSize: '1.3rem',
            }}>
              🔐
            </Box>
            <Typography
              component="h1"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                fontFamily: 'Heebo, sans-serif',
                color: 'var(--text-primary)',
              }}
            >
              התחברות למערכת
            </Typography>
            <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'Heebo, sans-serif', mt: 0.5 }}>
              הזן את פרטיך כדי להמשיך
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, direction: 'rtl' }}
          >
            <TextField
              id="email"
              label="שם משתמש / אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              sx={{
                '& .MuiInputBase-input': { fontFamily: 'Heebo, sans-serif' },
              }}
            />
            <TextField
              id="password"
              type="password"
              label="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              sx={{
                '& .MuiInputBase-input': { fontFamily: 'Heebo, sans-serif' },
              }}
            />
            <FormControlLabel
              control={<Checkbox color="primary" size="small" />}
              label="זכור אותי"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.88rem' } }}
            />
            <StyledButton type="submit" fullWidth variant="contained" size="large">
              כניסה למערכת
            </StyledButton>
          </Box>
        </Card>
      </Stack>
    </SignInContainer>
  );
}

