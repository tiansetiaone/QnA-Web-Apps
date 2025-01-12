import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Answer from '../pages/AnswerQuestions';
import QnAList from '../pages/QnAList';
import AdminDashboard from '../pages/AdminDashboard';
import UserDashboard from '../pages/UserDashboard';
import Category from '../pages/ManageCategories';
import Setting from '../pages/SettingDashboard';
import QnAListUser from '../pages/QnAListUser';
import EditProfil from '../pages/Profile';
import AskQuestion from '../pages/AskQuestion';
import BotChat from "../pages/BotChat";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/admin/list" element={<QnAList />} />
      <Route path="/user/list" element={<QnAListUser />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/bot" element={<BotChat />} />
      <Route path="/user/bot" element={<BotChat />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/category" element={<Category />} />
      <Route path="/admin/setting" element={<Setting />} />
      <Route path="/user/edit" element={<EditProfil />} />
      <Route path="/:questionId/answers" element={<Answer />} />
      <Route path="/user/question/add" element={<AskQuestion />} />
    </Routes>
  );
};

export default AppRouter;
