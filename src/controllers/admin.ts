import { NextFunction,Request,Response } from "express";
import {logger} from "../config/logger";
import {storage} from "../storage/main";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export class AdminController{
    adminLogin = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        let {password, name} = req.body
        let admin = await storage.admin.findOne({name:name})
        if(!admin){
            return res.status(404).json({
                success:false,
                message:'Admin not found!'
            })
        }

        if(admin.password!=password) {
            return res.status(400).json({
                success:false,
                message:"Password is incorrect!"
            })
        }

        res.status(200).json({
            success:true,
            message:"Logged In"
        })
    })


    create = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const admin = await storage.admin.create({...req.body, })

        res.status(201).json({
            success:true,
            data:{
                admin
            }
        })
    })

    getAll= catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const person = await storage.person.find(req.query)

        res.status(200).json({
            success:true,
            data:{
                person
            }
        })
    })

    getOne = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const person = await storage.person.findOne(req.body)

        res.status(200).json({
            success:true,
            data:{
                person
            }
        })
    })
    
}