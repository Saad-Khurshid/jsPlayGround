import { Request, Response, NextFunction } from 'express';
import { Customer, validateCustomer } from '../models/customer';

const getAllCustomers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const customers = await Customer.find().sort('name');
    res.status(200).send(customers);
};

const createCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    await customer.save();
    return res.status(200).send(customer);
};

const getCustomerById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    if (!customer)
        return res.status(404).send(`Customer with id ${id} not found.`);

    return res.status(200).send(customer);
};

const updateCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    if (!customer)
        return res.status(404).send(`Customer with id ${id} not found.`);

    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    customer.isGold = req.body.isGold;
    customer.name = req.body.name;
    customer.phone = req.body.phone;
    await customer.save();
    return res.status(200).send(customer);
};

const deleteCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    if (!customer)
        return res.status(404).send(`Customer with id ${id} not found.`);

    await customer.remove();
    return res.status(200).send(customer);
};

export {
    getAllCustomers,
    createCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
