
import React from "react "; import {
    Typography, Input, Textarea, Checkbox, Button,
} from "@material-tailwind/react "; export function ContactSection7() {
    return (<section className="grid h-screen place-items-center ">       <div className="mx-auto p-10 text-center lg:max-w-2xl ">         <Typography variant="h1 " color="blue-gray " className="mb-4 text-3xl lg:text-5xl "         >           Contact us         </Typography>         <Typography variant="lead " className="mb-16 !text-gray-500 ">           For further questions, including partnership opportunities, please           email hello@creative-tim.com or contact using our contact form.         </Typography>          <form action="# " className="flex flex-col gap-4 ">           <div className="grid gap-4 grid-cols-2 ">             <Input color="gray " size="lg " label="First Name " name="first-name " containerProps={
        {
            className: "!min-w-full ",
        }
    } />             <Input color="gray " type="email " size="lg " label="Email " name="email " containerProps={
        {
            className: "!min-w-full ",
        }
    } />           </div>           <Textarea rows={
        6
    } color="gray " size="lg " label="What can we help you with " name="message " />           <Checkbox color="gray " label={<Typography className="font-normal !text-gray-500 -mt-2 ">                 You agree to our{
        "  "
    }                 <a href="# " className="font-medium text-gray-700 hover:text-gray-900 "                 >                   Privacy Policy                 </a>                 .               </Typography>
    } containerProps={
        {
            className: "-ml-2.5 -mt-2 ",
        }
    } />           <Button size="lg " color="gray " className="mt-6 " fullWidth>             send message           </Button>         </form>       </div>     </section>);
} export default ContactSection7; 
