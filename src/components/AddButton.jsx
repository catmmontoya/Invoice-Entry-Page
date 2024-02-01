function AddButton({ addRow }) {
  return (
    <tr>
        <td></td>
        <td colSpan={4}>
            <button onClick={addRow}>Add Row</button>
        </td>
    </tr>
  )
}

export default AddButton