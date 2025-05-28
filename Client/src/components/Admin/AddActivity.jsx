import { Box, Button, Typography, MenuItem, Select, FormControl } from '@mui/material';
import React, { useState } from 'react';
import AdminSideBar from './Common/AdminSideBar';
import LogoutIcon from '@mui/icons-material/Logout';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import axios from 'axios';

const AddActivity = () => {
  const textFieldStyle = {
    height: '65px',
    width: '360px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    position: 'relative',
  };

  const [openLogout, setOpenLogout] = useState(false);
  const handleOpenLogout = () => setOpenLogout(true);
  const handleCloseLogout = () => setOpenLogout(false);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [category, setCategory] = useState('');
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ submitting: false, success: null, message: '' });

  const categories = [
    'Communication & Cognitive Skills',
    'Language & Creativity',
    'STEM Learning',
    'Mathematical Thinking',
    'Social Studies',
    'Visual Arts',
    'Science & Nature',
    'Communication Skills',
    'Social Skills',
    'Performing Arts',
    'Digital Literacy',
    'Social-Emotional Learning',
  ];

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(selected.type)) {
        setStatus({ submitting: false, success: false, message: 'Only JPG/PNG files are allowed.' });
        return;
      }
      setFileName(selected.name);
      setFile(selected);
    }
  };

  const handleSubmit = async () => {
    const parentId = JSON.parse(localStorage.getItem('parentdetails'))?._id;
    const token = localStorage.getItem('token');

    const newErrors = {};
    if (!activityName) newErrors.activityName = 'Activity name is required';
    if (!description) newErrors.description = 'Description is required';
    if (!category) newErrors.category = 'Category is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus({ submitting: false, success: false, message: 'Please fix the errors above.' });
      return;
    }

    setErrors({});
const formData = new FormData();
formData.append('activityName', activityName);
formData.append('description', description);
formData.append('category', category);
if (file) {
  formData.append('activityPhoto', file);
}

    try {
      setStatus({ submitting: true, success: null, message: '' });

const res = await axios.post('http://localhost:4000/ldss/addactivity', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  },
});



      setStatus({ submitting: false, success: true, message: 'Activity added successfully!' });
      setActivityName('');
      setDescription('');
      setCategory('');
      setFile(null);
      setFileName('No file chosen');
    } catch (error) {
      setStatus({
        submitting: false,
        success: false,
        message: error?.response?.data?.message || 'Failed to add activity.',
      });
    }
  };

  return (
    <Box display={'flex'} sx={{ background: '#F6F7F9', p: '13px', height: '100vh', width: '100%', overflowY: 'hidden' }}>
      <AdminSideBar />

      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          padding: '0px 15px',
          borderRadius: '8px',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{ height: '70px', background: 'white', borderRadius: '8px', width: '100%' }}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant='h3' sx={{ fontSize: '24px', fontWeight: '500', ml: '30px' }} color='primary'>
            Add Activity
          </Typography>
          <Button
            onClick={handleOpenLogout}
            variant='text'
            color='primary'
            sx={{ borderRadius: '25px', height: '40px', width: '200px', padding: '10px 35px' }}
            startIcon={<LogoutIcon />}
          >
            logout
          </Button>
        </Box>

        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          sx={{ mt: '20px', background: 'white', borderRadius: '8px', width: '100%', p: '30px', gap: '15px' }}
        >
          <Typography variant='h3' sx={{ fontSize: '18px', fontWeight: '600' }} color='primary'>
            Add Job
          </Typography>

          <Box mt={4} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={3}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3}>
              <div style={textFieldStyle}>
                <label>Activity name</label>
                <input
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: errors.activityName ? '1px solid red' : '1px solid #CCCCCC',
                    padding: '8px',
                  }}
                  name='activityName'
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  type='text'
                />
                {errors.activityName && <span style={{ color: 'red', fontSize: '12px' }}>{errors.activityName}</span>}
              </div>

<div style={textFieldStyle}>
  <label>Photo</label>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #CCCCCC',
      borderRadius: '8px',
      height: '40px',
      padding: '0 8px',
      cursor: 'pointer',
    }}
    component="label"
    htmlFor="file-upload"
  >
    <Typography
      variant="body1"
      sx={{ flexGrow: 1, color: fileName === 'No file chosen' ? '#999' : 'inherit' }}
    >
      {fileName}
    </Typography>

    <DriveFolderUploadIcon color="primary" />

    {/* hidden input INSIDE the label */}
    <input
      type="file"
      id="file-upload"
      style={{ display: 'none' }}
      accept="image/jpeg,image/png"
      onChange={handleFileChange}
    />
  </Box>
</div>

            </Box>

            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3}>
              <div style={textFieldStyle}>
                <label>Description</label>
                <input
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    border: errors.description ? '1px solid red' : '1px solid #CCCCCC',
                    padding: '8px',
                  }}
                  name='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type='text'
                />
                {errors.description && <span style={{ color: 'red', fontSize: '12px' }}>{errors.description}</span>}
              </div>

              <div style={textFieldStyle}>
                <label>Activity Category</label>
                <FormControl fullWidth>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                      height: '40px',
                      borderRadius: '8px',
                      border: errors.category ? '1px solid red' : '1px solid #CCCCCC',
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                    }}
                  >
                    <MenuItem value='' disabled>
                      Select category
                    </MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.category && <span style={{ color: 'red', fontSize: '12px' }}>{errors.category}</span>}
              </div>
            </Box>
          </Box>

          <Button
            variant='contained'
            color='secondary'
            onClick={handleSubmit}
            disabled={status.submitting}
            sx={{ mt: '20px', borderRadius: '25px', height: '45px', width: '150px', padding: '20px 35px' }}
          >
            {status.submitting ? 'Submitting...' : 'Submit'}
          </Button>

          {status.message && (
            <Typography color={status.success ? 'green' : 'red'} mt={1}>
              {status.message}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AddActivity;
