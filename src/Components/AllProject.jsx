import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const PageWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  minHeight: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  background: 'var(--bg-primary)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '800px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
});

const GridLines = styled(Box)({
  position: 'absolute',
  inset: 0,
  backgroundImage: `
    linear-gradient(rgba(99,102,241,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,0.035) 1px, transparent 1px)
  `,
  backgroundSize: '60px 60px',
  pointerEvents: 'none',
});

const Panel = styled(Box)({
  width: '100%',
  maxWidth: 480,
  background: 'var(--bg-card)',
  border: '1px solid var(--border-medium)',
  borderRadius: '20px',
  padding: '32px',
  boxShadow: 'var(--shadow-elevated), var(--glow-primary)',
  position: 'relative',
  zIndex: 1,
  animation: 'fadeInUp 0.5s ease forwards',
  direction: 'rtl',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)',
    borderRadius: '20px 20px 0 0',
  },
});

const ProjectItem = styled(ListItemButton)(({ selected }) => ({
  borderRadius: '10px !important',
  marginBottom: '6px !important',
  padding: '12px 14px !important',
  border: `1px solid ${selected ? 'rgba(99,102,241,0.35)' : 'transparent'} !important`,
  background: selected ? 'rgba(99,102,241,0.1) !important' : 'rgba(255,255,255,0.02) !important',
  transition: 'all 0.2s ease !important',
  '&:hover': {
    background: 'rgba(255,255,255,0.05) !important',
    border: '1px solid var(--border-medium) !important',
    transform: 'translateX(-2px)',
  },
}));

const AddButton = styled(ListItemButton)({
  borderRadius: '10px !important',
  background: 'rgba(99,102,241,0.08) !important',
  border: '1px dashed rgba(99,102,241,0.3) !important',
  padding: '12px 14px !important',
  transition: 'all 0.2s ease !important',
  '&:hover': {
    background: 'rgba(99,102,241,0.15) !important',
    border: '1px dashed rgba(99,102,241,0.6) !important',
    boxShadow: '0 4px 20px rgba(99,102,241,0.15) !important',
  },
});

const StatusDot = styled(Box)({
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  boxShadow: '0 0 8px rgba(99,102,241,0.6)',
  flexShrink: 0,
});

export default function AllProject() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const navigate = useNavigate();
  const projects = useSelector((state) => state.project.projectsList);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <PageWrapper>
      <GridLines />

      <Panel>
        {/* Header */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '100px',
            px: 2, py: 0.6,
            mb: 2,
          }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 6px #6366f1' }} />
            <Typography sx={{ fontSize: '0.75rem', color: '#818cf8', fontFamily: 'Heebo, sans-serif', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              סביבת עבודה
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontFamily: 'Heebo, sans-serif',
              fontSize: '1.6rem',
              background: 'linear-gradient(135deg, #f1f5f9 30%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            הפרויקטים שלי
          </Typography>
          <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'Heebo, sans-serif', mt: 0.5 }}>
            {projects.length > 0 ? `${projects.length} פרויקטים פעילים` : 'אין פרויקטים עדיין'}
          </Typography>
        </Box>

        {/* Project List */}
        <List
          component="nav"
          sx={{
            maxHeight: '340px',
            overflowY: 'auto',
            mb: 1,
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(99,102,241,0.3)', borderRadius: '2px' },
          }}
        >
          {projects.map((project, index) => (
            <ProjectItem
              key={index}
              selected={selectedIndex === index}
              onClick={(event) => {
                handleListItemClick(event, index);
                navigate(`/project/${index}`);
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <StatusDot />
              </ListItemIcon>
              <ListItemText
                primary={project.name}
                secondary={project.description}
                sx={{
                  textAlign: 'right',
                  '& .MuiListItemText-primary': {
                    fontFamily: 'Heebo, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--text-primary) !important',
                  },
                  '& .MuiListItemText-secondary': {
                    fontFamily: 'Heebo, sans-serif',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted) !important',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  },
                }}
              />
              <Box sx={{ color: 'var(--text-muted)', fontSize: '0.8rem', mr: 1 }}>←</Box>
            </ProjectItem>
          ))}

          {projects.length === 0 && (
            <Box sx={{
              textAlign: 'center',
              py: 4,
              color: 'var(--text-muted)',
              fontFamily: 'Heebo, sans-serif',
              fontSize: '0.9rem',
            }}>
              <Box sx={{ fontSize: '2rem', mb: 1 }}>📂</Box>
              עדיין לא נוצרו פרויקטים
            </Box>
          )}
        </List>

        <Divider sx={{ my: 2, borderColor: 'var(--border-subtle) !important' }} />

        {/* Add Project Button */}
        <List component="nav">
          <AddButton onClick={() => navigate('/AddProject')}>
            <ListItemText
              primary="＋  יצירת פרויקט חדש"
              sx={{
                textAlign: 'center',
                '& .MuiListItemText-primary': {
                  fontFamily: 'Heebo, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: '#818cf8 !important',
                  letterSpacing: '0.02em',
                },
              }}
            />
          </AddButton>
        </List>
      </Panel>
    </PageWrapper>
  );
}