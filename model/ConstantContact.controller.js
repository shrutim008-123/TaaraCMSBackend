import axios from "axios";
import dotenv from "dotenv";
import constantContactTokenModel from "./ConstantContactToken.model.js";
dotenv.config();

const getOAuthUrl = (req, res) => {
  const { CONSTANT_CONTACT_CLIENT_ID, CONSTANT_CONTACT_REDIRECT_URI } =
    process.env;

  const state = Math.random().toString(36).substring(2); // generate a random state string

  const oauthUrl = `https://authz.constantcontact.com/oauth2/default/v1/authorize?client_id=${CONSTANT_CONTACT_CLIENT_ID}&response_type=code&redirect_uri=${CONSTANT_CONTACT_REDIRECT_URI}&scope=contact_data%20offline_access&state=${state}`;

  // You should store the state in session or DB to validate it on callback
  res.json({ url: oauthUrl });
};

const exchangeToken = async (req, res) => {
  const { code } = req.body;
  const {
    CONSTANT_CONTACT_CLIENT_ID,
    CONSTANT_CONTACT_CLIENT_SECRET,
    CONSTANT_CONTACT_REDIRECT_URI,
  } = process.env;

  try {
    const response = await axios.post(
      "https://authz.constantcontact.com/oauth2/default/v1/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: CONSTANT_CONTACT_CLIENT_ID,
        client_secret: CONSTANT_CONTACT_CLIENT_SECRET,
        code,
        redirect_uri: CONSTANT_CONTACT_REDIRECT_URI,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const token = await constantContactTokenModel.create({
      tokenData: { ...response.data, created_at: new Date() },
    });
    token.save();

    // const { access_token, refresh_token, expires_in } = response.data;
    res.redirect(`http://localhost:5173/subscriber`);
  } catch (error) {
    console.error(
      "Error exchanging token:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to exchange code for token" });
  }
};

const getValidAccessToken = async () => {
  try {
    const tokenData = await constantContactTokenModel.find(); // Add user filtering if needed
    const tokenDoc = tokenData[0];
    console.log(tokenDoc?.tokenData?.refresh_token);

    // Refresh the token
    const res = await axios.post(
      "https://authz.constantcontact.com/oauth2/default/v1/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: tokenDoc?.tokenData?.refresh_token,
        client_id: process.env.CONSTANT_CONTACT_CLIENT_ID,
        client_secret: process.env.CONSTANT_CONTACT_CLIENT_SECRET,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log("==>", res.data);
    const data = res.data;

    tokenDoc.access_token = data.access_token;
    tokenDoc.refresh_token = data.refresh_token || tokenDoc.refresh_token;
    tokenDoc.expires_in = data.expires_in;
    tokenDoc.created_at = new Date();
    await tokenDoc.save();

    console.log("Token Refreshed", data.access_token);
    return data.access_token;
  } catch (error) {
    console.log("Error getting valid access token:", error);
    throw new Error("Failed to get valid access token");
  }
};

const getToken = async (req, res) => {
  try {
    const tokenData = await constantContactTokenModel.find();
    const tokenDoc = tokenData[0];
    res.status(200).json(tokenDoc);
  } catch (error) {
    res.status(500).json("server error");
  }
};

export { getOAuthUrl, exchangeToken, getValidAccessToken, getToken };
