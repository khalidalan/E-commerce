
function BlueBlock({ title }) {
  return (
    <div className="flex items-center gap-4  container">
      <span className="w-5 h-10 bg-blue-600 rounded-sm "></span>
      <h2 className="text-base font-semibold text-blue-600">{title}</h2>
    </div>
  );
}

export default BlueBlock;
