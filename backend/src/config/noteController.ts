import { NextFunction, Request, Response } from "express"
import noteModel from "../note/noteModel"
import envConfig from "./config"
import createHttpError from "http-errors"
import { nextTick } from "process"



const createNote=async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const file=req.file ?`${envConfig.backendurl}/${req.file.filename}` :'https://imgs.search.brave.com/YZ517Vhe27JsuKIXj2EPLK2M6sieZ9oh1K-oVE_5kRM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc2/NDI2NjY0NC92ZWN0/b3IvZmFjZS13aXRo/LXRlYXJzLW9mLWpv/eS1lbW9qaS1pY29u/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz04d09ENmhzT2pW/bDE0aVdTU3RiaGtR/Tm9WRHAtSjQ0cUli/N1RiY01XaHdBPQ'
    const{title,subtitle,description}=req.body
    if(!title || !subtitle || !description){
      res.status(400).json({
        message:"please provide tittle subtitile and description"
      })
      return
    }
    await noteModel.create({
      title,
      subtitle,
      description,
      file
    })
    res.status(201).json({
      message:"note created"
    })
    
  } catch (error) {
    console.log(error);
    next(createHttpError(500,"error while createing")) 
  }
}

const listNotes=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const notes=await noteModel.find()
    res.status(200).json({
      message:"note fetched",
      data:notes
    })
    
  } catch (error) {
    return next(createHttpError(500,"error while fetching..."))
  }
}
const listNote=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {id}=req.params
    const note=await noteModel.findById(id)
    res.status(200).json({
      message:"note fetched",
      data:note
    })
    
  } catch (error) {
    return next(createHttpError(500,"error while fetching..."))
  }
}
const deleteNote=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {id}=req.params
    const note=await noteModel.findByIdAndDelete(id)
    if(!note){
      return next(createHttpError(404,"note not found with this id"))
    }
    res.status(200).json({
      message:"note deleted",
    })
    
  } catch (error) {
    return next(createHttpError(500,"error while fetching..."))
  }
}
export {createNote,listNote,listNotes,deleteNote}