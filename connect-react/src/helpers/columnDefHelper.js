

export const columnDefs =  [
    {
      field: "userId",
      minWidth: 20,
      checkboxSelection:true,
      filter: 'agTextColumnFilter',
      headerCheckboxSelectionFilteredOnly:true,
      headerCheckboxSelection:true
    },
    {
      field: "id",
      minWidth: 20,
      filter: 'agTextColumnFilter'
    },
    {
      field: "title",
      minWidth: 350,
      filter: 'agTextColumnFilter'
    },
    {
      field: "body",
      minWidth: 350,
      filter: 'agTextColumnFilter',

    },

  ];
 export const  defaultColDef = {
    flex: 1,
    minWidth: 50,
    filter: true,
    closeOnApply: true,

  }
