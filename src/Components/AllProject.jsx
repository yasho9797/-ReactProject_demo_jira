import * as React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; // ייבוא ה-Hook למשיכת נתונים
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DraftsIcon from '@mui/icons-material/Drafts';

export default function AllProject() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const navigate = useNavigate(); 

  // משיכת רשימת הפרויקטים מה-Store
 // const projects = useSelector((state) => state.project.projectsList || state.project);
const projects = useSelector((state) => state.project.projectsList);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, bgcolor: '#f0f2f5' 
    }}>
      <Box sx={{ 
        width: '100%', maxWidth: 450, bgcolor: 'white', 
        boxShadow: '0px 10px 30px rgba(0,0,0,0.1)', borderRadius: 4, p: 4, textAlign: 'right' 
      }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2', textAlign: 'center' }}>
          רשימת פרויקטים
        </Typography>

        <List component="nav" sx={{ maxHeight: '300px', overflowY: 'auto' }}>
          {/* לולאה שעוברת על כל הפרויקטים מה-Store */}
          {projects.map((project, index) => (
            <ListItemButton
              key={index}
              selected={selectedIndex === index}
              onClick={(event)=>{   
                handleListItemClick(event, index),
                navigate(`/project/${index}`)
              }
              } 
              sx={{ borderRadius: 2, mb: 1 }}
            >
              <ListItemIcon>
                <DraftsIcon color={selectedIndex === index ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText 
                primary={project.name} 
                secondary={project.description} 
                sx={{ textAlign: 'right' }} 
              />
            </ListItemButton>
          ))}

          {/* הודעה אם אין פרויקטים */}
          {projects.length === 0 && (
            <Typography sx={{ textAlign: 'center', color: 'gray', my: 2 }}>
              אין פרויקטים להצגה
            </Typography>
          )}
         
        </List>

        <Divider sx={{ my: 2 }} />

        <List component="nav">
          <ListItemButton
            onClick={() => navigate('/AddProject')}
            sx={{ borderRadius: 2, bgcolor: '#e3f2fd', '&:hover': { bgcolor: '#bbdefb' } }}
          >
            <ListItemText primary="➕  ליצירת פרויקט חדש" sx={{ textAlign: 'right', fontWeight: 'bold' }} />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
}