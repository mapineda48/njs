import React from "react";
import Form from "./Component/Form";
import Input from "./Component/Form/Input";
import Select from "./Component/Form/Select";

// const date = new Date("2023-01-19T04:03:00.000Z");

// const foo = {
//   fullName: "Miguel Pineda",
//   email: "a.pinedavegamiguel@gmail.com",
//   department: "1",
//   city: 3,
//   birthday: date.toInputDateTimeString(),
// };

// function App() {
//   return (
//     <Form
//       defaultValues={foo}
//       onSubmit={(rest, data) => {
//         console.log(data);
//       }}
//       onInvalid={(errors) => {}}
//     >
//       <div className="mb-3">
//         <label htmlFor="fullName" className="form-label">
//           Nombre
//         </label>
//         <Input
//           name="fullName"
//           type="text"
//           className="form-control"
//           id="fullName"
//           placeholder="Miguel Pineda"
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="email" className="form-label">
//           Correo
//         </label>
//         <Input
//           name="email"
//           type="email"
//           className="form-control"
//           id="email"
//           placeholder="name@example.com"
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="department" className="form-label">
//           Departamento
//         </label>
//         <Select
//           id="department"
//           name="department"
//           className="form-select"
//           aria-label="Default select example"
//         >
//           <option value={0}>Open this select menu</option>
//           <option value={1}>One</option>
//           <option value={2}>Two</option>
//           <option value={3}>Three</option>
//         </Select>
//       </div>
//       <div className="mb-3">
//         <label htmlFor="city" className="form-label">
//           Ciudad
//         </label>
//         <Select
//           id="city"
//           name="city"
//           className="form-select"
//           aria-label="Default select example"
//         >
//           <option value={0}>Open this select menu</option>
//           <option value={1}>One</option>
//           <option value={2}>Two</option>
//           <option value={3}>Three</option>
//         </Select>
//       </div>
//       <div className="mb-3">
//         <label htmlFor="birthday" className="form-label">
//           Fecha Nacimiento:
//         </label>
//         <Input
//           name="birthday"
//           valueAsDate
//           type="datetime-local"
//           className="form-control"
//           id="birthday"
//           placeholder="Miguel Pineda"
//         />
//       </div>
//       <input type="submit" value="Enviar" />
//     </Form>
//   );
// }

// export default App;
