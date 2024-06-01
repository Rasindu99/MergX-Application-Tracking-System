import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const EditProfile = () => {
  const { user } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [showForm] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('showForm') === 'true';
  });
  const [formData, setFormData] = useState(() => {
    const storedFormData = localStorage.getItem('formData');
    return storedFormData ? JSON.parse(storedFormData) : {
      fname: '',
      lname: '',
      email: '',
      phone_number: '',
      role: '',
      education: '',
      bio: '',
      dob: '',
      gender: '',
      image: '',
    };
  });

  
  useEffect(() => {
    if (user) {
      setFormData({
        fname: user.fname || '',
        lname: user.lname || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        role: user.role || '',
        education: user.education || '',
        bio: user.bio || '',
        dob: user.dob || '',
        gender: user.gender || '',
        image: user.image || '',
      });
      setImage(user.image || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      console.error('User ID is not available.');
      return;
    }
    try {
      await axios.put(`/users/${user._id}`, formData);
      localStorage.removeItem('formData'); // Clear local storage after successful submission
      toast.success('Updated successfully');
     // window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {
    // Store formData in local storage whenever it changes
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
        setFormData({ ...formData, [name]: reader.result });
      };
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleYesClick = () => {
    const currentUrl = window.location.href;
    const newUrl = currentUrl.includes('?')
      ? `${currentUrl}&showForm=true`
      : `${currentUrl}?showForm=true`;
    window.location.href = newUrl;
  };
  
  

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log(formData.fname);
  console.log(formData.phone_number);
  
  

  return (
    <div className='flex items-center justify-center h-full'>
      {!showForm ? (
        <div className=''>
          <div className=''><h1 className='text-4xl'>Do you want to update your details?</h1></div> 
          <div className='pt-8'><button onClick={handleYesClick} className='px-4 py-2 font-bold text-white bg-orange-600 rounded hover:bg-orange-400'>Yes update !</button></div>
        </div>
      ) : (
        
        <div className=''>
          
          <form onSubmit={handleSubmit}>

            <div className='flex justify-between'>
            
            <div>
            <div className='flex justify-center pl-10 pr-10 mt-8 text-start'>
              <div>
                <div className='flex justify-between w-full'>
                  <div className='pb-2'>
                    <label className='opacity-40'>First Name:</label>
                    <div className='pt-1 pl-0'>
                      <input
                        className="bg-[#2a2a2a] w-[170px] h-10 rounded-lg pl-4"
                        type='text'
                        name='fname'
                        placeholder='First Name'
                        value={formData.fname}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className='pb-2'>
                    <label className='opacity-40'>Last Name:</label>
                    <div className='pt-1 pl-0'>
                      <input
                        className="bg-[#2a2a2a] w-[170px] h-10 rounded-lg pl-4"
                        type='text'
                        name='lname'
                        placeholder='Last Name'
                        value={formData.lname}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className='pb-2'>
                  <label className='opacity-40'>Email:</label>
                  <div className='pt-1 pl-10'>
                    <input
                      className="bg-[#2a2a2a] w-[400px] h-10 rounded-lg pl-4"
                      type='email'
                      name='email'
                      placeholder='Email'
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className='pb-2'>
              <label  className='opacity-40'>Mobile Number : </label>
                <div className='pt-1 pl-10'>
                  <input
                    className="bg-[#2a2a2a] w-[400px] h-10 rounded-lg pl-4"
                    type='text'
                    name='phone_number'
                    placeholder='Phone number'
                    value={formData.phone_number}
                    onChange={handleInputChange}
                  />
                </div>
                
              </div>

              <div className='pb-2'>
                    <label className='opacity-40'>Date of Birth:</label>
                    <div className='pt-1 pl-10'>
                      <input
                        className="bg-[#2a2a2a] w-[400px] h-10 rounded-lg pl-4"
                        type='date'
                        name='dob'
                        placeholder='Birth Day'
                        value={formData.dob}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className='text-left'>
                    <label className='opacity-40'>Gender:</label>
                    <div className='pt-1 pl-10'>
                      <select
                        name='gender'
                        className='h-10 text-left rounded-lg bg-opacity-10 md:48 optional:bg-[#2a2a2a] w-[400px] pl-4'
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option value='male' className='text-white bg-black bg-opacity-90'>Male</option>
                        <option value='female' className='text-white bg-black bg-opacity-90'>Female</option>
                        <option value='other' className='text-white bg-black bg-opacity-90'>Other</option>
                      </select>
                    </div>
                  </div>
                
              </div>
            </div>
            </div>
            
            <div className='pl-8 border-l border-orange-500'>
                <div className='flex justify-center '>
                  {image ? (
                    <div>
                      <img src={image} alt='' className='rounded-full h-[200px] w-[200px] border-[2px]'></img>
                    </div>
                  ) : (
                    <img src={formData.image} alt='' className='rounded-full h-[200px] w-[200px] border-[2px]'></img>
                  )}
                </div>
                <div>
                  <input
                    accept='image/*'
                    type='file'
                    name='image'
                    className=''
                    onChange={handleInputChange}
                  />
                </div> 

                <div className=''>
                    <div>
                    <label className='flex text-left opacity-40'>Education:</label>
                    </div>
                    <div className='pt-1 pl-10'>
                      <textarea
                        className='bg-[#2a2a2a] w-[400px] h-10 rounded-lg pl-4'
                        type='text'
                        name='education'
                        value={formData.education}
                        onChange={handleInputChange}
                      >
                        
                      </textarea>
                    </div>
              </div>

              <div className=''>
                    <div>
                    <label className='flex text-left opacity-40'>Bio:</label>
                    </div>
                    <div className='pt-1 pl-10'>
                      <textarea
                        className='bg-[#2a2a2a] w-[400px] h-20 rounded-lg pl-4'
                        type='text'
                        name='bio'
                        value={formData.bio}
                        onChange={handleInputChange}
                      >
                        
                      </textarea>
                    </div>
                </div>

            </div>
              
            </div>

            <div className='pt-8'>
              <button type='submit' className='px-4 py-2 font-bold text-white bg-orange-600 rounded hover:bg-orange-400'>
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
