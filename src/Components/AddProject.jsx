
// import React, { useState } from 'react';
// import { Box, Typography, Button, TextField, Paper, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addProject } from '../Components/store/projectSlice';

// export default function AddProject() {
//   const [projectName, setProjectName] = useState('');
//   const [projectDescription, setProjectDescription] = useState('');
  
//   // State חדש לניהול השגיאות
//   const [errors, setErrors] = useState({ name: false, desc: false });
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSave = () => {
//     // בדיקה אקטיבית של השדות
//     const nameError = projectName.trim() === '';
//     const descError = projectDescription.trim() === '';

//     // עדכון ה-State של השגיאות כדי לצבוע את השדות באדום
//     setErrors({ name: nameError, desc: descError });

//     // אם אחד מהם ריק - נעצור כאן
//     if (nameError || descError) return;

//     // אם הכל תקין - נשמור
//     dispatch(addProject({ name: projectName, description: projectDescription }));
//     navigate(-1);
//   };

//   return (
//     <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', pt: 5 }}>
//       <Paper sx={{ p: 0, width: '100%', maxWidth: '500px', borderRadius: 2, overflow: 'hidden' }}>
        
//         {/* Header */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#1976d2', color: 'white', p: 2 }}>
//           <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
//             <CloseIcon />
//           </IconButton>
//           <Typography variant="h6" sx={{ fontWeight: 'bold' }}>יצירת פרויקט חדש</Typography>
//           <Button 
//             variant="contained" 
//             onClick={handleSave}
//             sx={{ bgcolor: '#4fc3f7', '&:hover': { bgcolor: '#29b6f6' }, fontWeight: 'bold', color: '#fff' }}
//           >
//             שמור פרויקט
//           </Button>
//         </Box>

//         {/* Form Body */}
//         <Box sx={{ p: 4, textAlign: 'right', direction: 'rtl' }}>
          
//           {/* שדה שם פרויקט */}
//           <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>שם הפרויקט</Typography>
//           <TextField
//             fullWidth
//             placeholder="הכנס שם פרויקט..."
//             value={projectName}
//             onChange={(e) => {
//               setProjectName(e.target.value);
//               if (e.target.value.trim() !== '') setErrors(prev => ({ ...prev, name: false }));
//             }}
//             error={errors.name} // צובע באדום אם יש שגיאה
//             helperText={errors.name ? "חובה להזין שם פרויקט" : ""} // טקסט קטן למטה
//             variant="outlined"
//             sx={{ mb: 3 }}
//           />

//           {/* שדה תיאור פרויקט */}
//           <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>תיאור הפרויקט</Typography>
//           <TextField
//             fullWidth
//             placeholder="מה עושים בפרויקט?"
//             value={projectDescription}
//             onChange={(e) => {
//               setProjectDescription(e.target.value);
//               if (e.target.value.trim() !== '') setErrors(prev => ({ ...prev, desc: false }));
//             }}
//             error={errors.desc} // צובע באדום אם יש שגיאה
//             helperText={errors.desc ? "חובה להזין תיאור לפרויקט" : ""} // טקסט קטן למטה
//             variant="outlined"
//             multiline
//             rows={4}
//             sx={{ mb: 3 }}
//           />
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

import React from 'react';
import { Box, Typography, Button, TextField, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'; // ייבוא הספרייה
import { addProject } from '../Components/store/projectSlice';

export default function AddProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // הגדרת ה-Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // פונקציית השליחה שתופעל רק אם הטופס תקין
  const onSubmit = (data) => {
    dispatch(addProject({ name: data.projectName, description: data.projectDescription }));
    navigate(-1);
  };

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', pt: 5 }}>
      <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: '500px', borderRadius: 2, overflow: 'hidden' }}>
        
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#1976d2', color: 'white', p: 2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}><CloseIcon /></IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>יצירת פרויקט חדש</Typography>
          <Button type="submit" variant="contained" sx={{ bgcolor: '#4fc3f7', '&:hover': { bgcolor: '#29b6f6' }, fontWeight: 'bold' }}>
            שמור פרויקט
          </Button>
        </Box>

        {/* גוף הטופס */}
        <Box sx={{ p: 4, textAlign: 'right', direction: 'rtl' }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>שם הפרויקט</Typography>
          <TextField
            fullWidth
            placeholder="הכנס שם פרויקט..."
            {...register("projectName", { required: "חובה להזין שם פרויקט" })} // וולידציה
            error={!!errors.projectName}
            helperText={errors.projectName?.message}
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>תיאור הפרויקט</Typography>
          <TextField
            fullWidth
            placeholder="מה עושים בפרויקט?"
            multiline
            rows={4}
            {...register("projectDescription", { required: "נא להוסיף תיאור קצר" })} // וולידציה
            error={!!errors.projectDescription}
            helperText={errors.projectDescription?.message}
            sx={{ mb: 3 }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
