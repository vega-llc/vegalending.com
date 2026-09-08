(() => {
  "use strict";
  const dialog=document.getElementById('image-dialog');
  document.querySelectorAll('[data-desk]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-desk]').forEach(option=>option.setAttribute('aria-pressed',String(option===button)));
  document.querySelectorAll('[data-desk-panel]').forEach(panel=>panel.hidden=panel.dataset.deskPanel!==button.dataset.desk);
  }));
  document.querySelectorAll('.image-button').forEach(button=>button.addEventListener('click',()=>{
  const img=document.getElementById('large-image');img.src=button.dataset.image;img.alt=button.dataset.caption;
  document.getElementById('image-caption').textContent=button.dataset.caption;dialog.showModal();
  }));
  document.getElementById('close-image').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  document.querySelectorAll('[data-expense]').forEach(button=>button.addEventListener('click',()=>{
  const reports=button.dataset.expense==='reports';const src=reports?'assets/expense-reports.png':'assets/expense-receipts.png';
  const image=document.getElementById('expense-phone-image');image.src=src;image.alt=reports?'ExpenseOnTheGo iPhone report options':'ExpenseOnTheGo iPhone receipt list';
  const view=document.getElementById('expense-view');view.dataset.image=src;view.dataset.caption=reports?'ExpenseOnTheGo 2.0 — iPhone reports':'ExpenseOnTheGo 2.0 — iPhone receipts';view.setAttribute('aria-label',reports?'Enlarge ExpenseOnTheGo reports':'Enlarge ExpenseOnTheGo receipts');
  document.getElementById('expense-phone-caption').textContent=reports?'Reports, ready to prepare':'Receipts, ready to review';
  document.querySelectorAll('[data-expense]').forEach(option=>option.setAttribute('aria-pressed',String(option===button)));
  }));

})();
