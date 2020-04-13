import AddMenu from '../components/AddMenu';



const addMenuItems = props => {
  return (
    <div>
      <AddMenu id={props.query.id} />
    </div>
  )
};

export default addMenuItems;
