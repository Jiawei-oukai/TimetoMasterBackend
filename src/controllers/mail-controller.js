import { transporter } from "../services/mail-service.js";
import { setErrorResponse, setResponse } from "./response-handler.js";

export const sendMail = async (request, response) => {
  try {
    const sendMail = await transporter.sendMail({
      from: "timetomastery.10k@gmail.com",
      to: request.body.to,
      subject: request.body.subject,
      text: request.body.text,
    });
    setResponse(sendMail, response);
  } catch (error) {
    setErrorResponse(500, error, response);
  }
};
 