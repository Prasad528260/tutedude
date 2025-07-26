// controllers/analyticsController.js
import { Order } from '../models/order.js';
import mongoose from 'mongoose';

const validatePeriod = (period) => ['day', 'week', 'month', 'year'].includes(period);

export const getShopAnalytics = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const period = validatePeriod(req.query.period) ? req.query.period : 'month';
    
    // Date range calculation
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - (period === 'year' ? 12 : 1));
    if (period === 'day') startDate.setDate(endDate.getDate() - 1);
    if (period === 'week') startDate.setDate(endDate.getDate() - 7);

    // Get order stats
    const [stats, topProducts, salesTrend] = await Promise.all([
      Order.aggregate([
        { 
          $match: { 
            shop: new mongoose.Types.ObjectId(shopId),
            createdAt: { $gte: startDate }
          } 
        },
        { $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          pendingOrders: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } }
        }}
      ]),
      Order.aggregate([
        { 
          $match: { 
            shop: new mongoose.Types.ObjectId(shopId),
            createdAt: { $gte: startDate }
          } 
        },
        { $unwind: '$items' },
        { $group: {
          _id: '$items.product',
          name: { $first: '$items.name' },
          totalSold: { $sum: '$items.quantity' }
        }},
        { $sort: { totalSold: -1 } },
        { $limit: 5 }
      ])
    ]);

    res.json({
      stats: stats[0] || { totalOrders: 0, totalRevenue: 0, pendingOrders: 0 },
      topProducts: topProducts || [],
      period
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};

export const getVendorAnalytics = async (req, res) => {
  try {
    const vendorId = req.user._id;
    const period = validatePeriod(req.query.period) ? req.query.period : 'month';
    
    // Date range calculation
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - (period === 'year' ? 12 : 1));
    if (period === 'day') startDate.setDate(endDate.getDate() - 1);
    if (period === 'week') startDate.setDate(endDate.getDate() - 7);

    const [stats, recentOrders] = await Promise.all([
      Order.aggregate([
        { 
          $match: { 
            vendor: new mongoose.Types.ObjectId(vendorId),
            createdAt: { $gte: startDate }
          } 
        },
        { $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' },
          pendingOrders: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } }
        }}
      ]),
      Order.find({ 
        vendor: vendorId,
        createdAt: { $gte: startDate }
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('totalAmount status createdAt')
      .populate('shop', 'shopName')
    ]);

    res.json({
      stats: stats[0] || { totalOrders: 0, totalSpent: 0, pendingOrders: 0 },
      recentOrders: recentOrders || [],
      period
    });

  } catch (error) {
    console.error('Vendor analytics error:', error);
    res.status(500).json({ message: 'Error fetching vendor analytics' });
  }
};