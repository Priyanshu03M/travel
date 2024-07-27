import { optionLocations, optionTypes } from "Qui/data/data";
import {z} from "zod"

const schema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    desc: z.string().min(1, {message: "description is required"}),
    beds: z.number().min(1,{message: "Beds are required"}),
    hasFreeWifi: z.boolean().optional(),
    type: z.enum(optionTypes.map(({value})=>value)),
    location: z.enum(optionLocations.map(({value})=>value)),
    pricePerNight: z.number(15, {message: "Price must be above 1500"}).max(500000, {message: "Price can't be above 500000"})
})

export {schema}