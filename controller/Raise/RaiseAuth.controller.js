import { generateRaiseToken } from '../../middleware/authorization.middleware.js';

// Generate token for raise routes access
export const getRaiseToken = async (req, res) => {
  try {
    // Generating token for any request
    const payload = {
      type: 'raise_access',
      timestamp: Date.now(),
    };

    const token = generateRaiseToken(payload, '7d'); // Token valid for 7 days

    res.status(200).json({
      success: true,
      message: 'Raise access token generated successfully',
      token,
      expiresIn: '7d'
    });

  } catch (error) {
    console.error('Token generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate access token',
      error: error.message
    });
  }
};