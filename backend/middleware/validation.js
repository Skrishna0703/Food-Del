import { body, validationResult } from 'express-validator';

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
export const validateRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  handleValidationErrors
];

// User login validation
export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Order placement validation
export const validateOrderPlacement = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  
  body('items.*.foodId')
    .isMongoId()
    .withMessage('Invalid food item ID'),
  
  body('items.*.quantity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Quantity must be between 1 and 10'),
  
  body('amount')
    .isFloat({ min: 1 })
    .withMessage('Order amount must be greater than 0'),
  
  body('address.street')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Street address must be between 5 and 100 characters'),
  
  body('address.city')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),
  
  body('address.zipcode')
    .matches(/^[0-9]{6}$/)
    .withMessage('Please provide a valid 6-digit zipcode'),
  
  handleValidationErrors
];

// Order status update validation
export const validateOrderStatusUpdate = [
  body('orderId')
    .isMongoId()
    .withMessage('Invalid order ID'),
  
  body('status')
    .isIn(['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'])
    .withMessage('Invalid order status'),
  
  handleValidationErrors
];
