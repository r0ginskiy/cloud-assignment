# 🌩️ Cloud Assignment

## 📌 Overview

This project demonstrates a simple **cloud-native full-stack application** using AWS and React.  
It consists of:

- **Backend (AWS SAM + Lambda + DynamoDB + API Gateway + SNS)**  
  Provides a REST API for customer management (`POST`, `GET`, `DELETE`).  
  On customer creation, a notification is sent to an **SNS Topic** with an **Email Subscription**.

- **Frontend (React + Vite + Chakra UI)**  
  A simple UI to call the backend API (Add, Get, Delete customer).

---

## ⚙️ Backend (AWS SAM)

### Prerequisites

- AWS account
- AWS CLI configured
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
- Node.js 22.x

### Setup & Deploy

```bash
cd backend
npm install
sam build
sam deploy
```

During the guided deploy, provide:

- **Stack name** (e.g., `cloud-assignment`)
- **Email address** for SNS subscription (you must confirm this via the link sent by AWS!)

After deployment, SAM will output:

- **CustomerApiUrl** → API Gateway endpoint
- **UserCreatedTopicArn** → ARN of SNS topic

### API Endpoints

**Add customer**

```bash
curl -X POST "<CustomerApiUrl>/customer"   -H "Content-Type: application/json"   -d '{"id":"test123"}'
```

**Get customer**

```bash
curl "<CustomerApiUrl>/customer/test123"
```

**Delete customer**

```bash
curl -X DELETE "<CustomerApiUrl>/customer/test123"
```

### Email Notification

1. Confirm the subscription email after deployment (click **Confirm subscription**).
2. Perform `POST /customer` — you should receive an email with subject **New Customer Created**.

---

## 🎨 Frontend (React)

### Prerequisites

- Node.js 22.x
- npm or yarn

### Setup & Run

```bash
cd frontend
npm install
npm run dev
```

### Features

- **Add Customer** → Create a new customer
- **Get Customer** → Retrieve customer by ID
- **Delete Customer** → Remove customer by ID

---

## ✅ Checklist

- [ ] `sam deploy` completed successfully
- [ ] DynamoDB table `customer_ids` created
- [ ] API Gateway is reachable (`POST/GET/DELETE /customer`)
- [ ] Lambda publishes messages to SNS on customer creation
- [ ] Email subscription confirmed and messages received
- [ ] Frontend configured with correct API URL

---

## 🧩 Architecture

```
   React Frontend
        │
        ▼
   API Gateway ──────► Lambda (Put/Get/Delete)
                          │
                          ├──► DynamoDB (customer_ids)
                          │
                          └──► SNS Topic ───► Email Subscriber
```

---

## 📖 Frontend Hosting

The frontend is deployed and publicly available via Amazon S3 + CloudFront:

👉 https://d3w34hwu9o2ae3.cloudfront.net/

This allows accessing the React application directly through a CDN-distributed URL

---

---

## 📖 Technologies

- **Backend:** AWS Lambda, API Gateway, DynamoDB, SNS, SAM
- **Frontend:** React, Vite, Chakra UI
- **Language:** TypeScript / Node.js 22.x

---

✨ With this setup you have a fully working **cloud-native full-stack app** with database persistence and email notifications.
