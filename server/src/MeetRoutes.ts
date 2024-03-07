import express, { Request, Response } from 'express';
import Meet, { IMeet } from './meetSchema'; // Importing the Meet schema

const router = express.Router();

interface CreateMeetRequestBody {
  meetId: string;
  shopId: string;
  productId: string;
  // Add more properties if needed
}

// Route to create a new meet
router.post('/create', async (req: Request<any, any, CreateMeetRequestBody>, res: Response) => {
  try {
    const { meetId, shopId, productId } = req.body;

    // Creating a new Meet document
    const newMeet = new Meet({
      meetId,
      shopId,
      productId
    });

    // Saving the new Meet document to the database
    const savedMeet = await newMeet.save();

    res.status(201).json(savedMeet); // Sending the saved Meet document as a response
  } catch (error) {
     if (error instanceof Error)
    res.status(500).json({ message: error.message });
  }
});

// Route to add a customer ID to an existing meet for a particular shopId and productId
router.put('/:shopId/:productId/add-customer', async (req: Request<{ shopId: string, productId: string }, any, { customerId: string }>, res: Response) => {
  try {
    const { shopId, productId } = req.params;
    const { customerId } = req.body;

    // Finding the meet document by shopId and productId
    const meet = await Meet.findOne({ shopId, productId });

    if (!meet) {
      return res.status(404).json({ message: 'Meet not found for the provided shopId and productId' });
    }

    // Adding the customer ID to the customers array
    meet.customers.push(customerId);

    // Saving the updated meet document
    const updatedMeet = await meet.save();

    res.json(updatedMeet); // Sending the updated Meet document as a response
  } catch (error) {
       if (error instanceof Error)
    res.status(500).json({ message: error.message });
  }
});
// Route to get meet details for a specific shopId
router.get('/:shopId/meets', async (req: Request<{ shopId: string }, any, any>, res: Response) => {
  try {
    const { shopId } = req.params;

    // Finding all meet documents for the provided shopId
    const meets = await Meet.find({ shopId });

    res.json(meets); // Sending the meet documents as a response
  } catch (error) {
       if (error instanceof Error)
    res.status(500).json({ message: error.message });
  }
});

// export default router;
export {router as meetRoutes};
