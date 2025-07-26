// routes/analyticsRouter.js
import express from 'express';
import { 
  getShopAnalytics,
  getVendorAnalytics
} from '../controllers/analyticsController.js';
import { userAuth, shopkeeperAuth } from '../middleware/userAuth.js';

const router = express.Router();

// Middleware to validate period parameter
const validatePeriod = (req, res, next) => {
  const validPeriods = ['day', 'week', 'month', 'year'];
  if (req.query.period && !validPeriods.includes(req.query.period)) {
    return res.status(400).json({ 
      message: 'Invalid period. Must be one of: day, week, month, year' 
    });
  }
  next();
};

// Shop analytics (for shopkeepers)
// GET /api/analytics/shops/:shopId?period=month
router.get(
  '/shops/:shopId',
  userAuth,
  shopkeeperAuth,
  validatePeriod,
  getShopAnalytics
);

// Vendor analytics
// GET /api/analytics/vendor?period=month
router.get(
  '/vendor',
  userAuth,
  validatePeriod,
  getVendorAnalytics
);

export default router;