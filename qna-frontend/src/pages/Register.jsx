import React, { useState } from 'react';
import axios from '../services/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import logo from "../assets/logos.png"; // Path menuju file logo
import icon1 from "../assets/username.png"; // Path menuju file logo
import icon2 from "../assets/wa-icon.png"; // Path menuju file logo
import icon3 from "../assets/pass.png"; // Path menuju file logo
import icon4 from "../assets/cpass.png"; // Path menuju file logo



const Register = () => {
    const [formData, setFormData] = useState({
      username: '',
      whatsapp_number: '',
      password: '',
      confirmPassword: '', // Tambahan field konfirmasi password
      role: 'user', // Default role 'user'
    });
  
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        setError('Password dan Konfirmasi Password tidak cocok.');
        return;
      }
  
      try {
        const { username, whatsapp_number, password, role } = formData; // Destructure data
        const response = await axios.post('/users/register', {
          username,
          whatsapp_number,
          password,
          role,
        });
        console.log('User registered:', response.data);
        navigate('/login'); // Redirect to login after registration
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Registration failed.');
      }
    };
  
    return (
      <div className="register-container">
        <div className="register-left">
          <h1 className='signIn'>DAFTAR</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="iconForm">
              <img src={icon1} alt="icon-username" />
              </div>
              <input
                type="text"
                placeholder="Username.."
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
            <div className="iconForm">
            <img src={icon2} alt="icon-wa" />
            </div>
              <input
                type="text"
                placeholder="No. WhatsApp.."
                name="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
            <div className="iconForm">
            <img src={icon3} alt="icon-pass" />
            </div>
              <input
                type="password"
                placeholder="Isi Password.."
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
            <div className="iconForm">
            <img src={icon4} alt="icon-cpass" />
            </div>
              <input
                type="password"
                placeholder="Konfirmasi Password.."
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="btn-group">
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn-submit">Submit</button>
            <p className="redirect-login">
              Sudah Punya Akun? <a href="/">Masuk disini</a>
            </p>
            </div>
          </form>
        </div>
        <div className="register-right">
          <div className="logo">
            <img src={logo} alt="logo" />
            <p>APP.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Register;