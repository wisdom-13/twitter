import express from 'express';
import { } from 'express-async-error';
import { body } from 'express-validator';
import { validate } from '../middleware/vaildator.js';
import * as authController from '../controller/auth.js';

const router = express.Router();

const validateCredential = [
  body('username')
    .trim()
    .isLength({ min: 2 })
    .withMessage('2글자 이상 입력하세요.'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('5글자 이상 입력하세요.'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('name')
    .notEmpty()
    .withMessage('이름을 입력하세요.'),
  body('email')
    .isEmail()
    .normalizeEmail().withMessage('정확한 이메일을 입력하세요.'),
  body('url')
    .isURL()
    .withMessage('정확한 이미지 주소를 입력하세요.')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateCredential, authController.login);

export default router;