import nodemailer from "nodemailer";

const sendTaskReminder = async (
  email: string,
  taskTitle: string,
  dueDate: Date
) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const message = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Task Reminder",
    text: `Your task "${taskTitle}" is due on ${dueDate.toDateString()}.`,
  };

  await transporter.sendMail(message);
};

export { sendTaskReminder };
