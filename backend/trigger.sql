CREATE OR REPLACE FUNCTION handle_job_delete() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
	update locations set jobs=regexp_replace(jobs, OLD.job_id||'\||$', '');
	update skills set jobs=regexp_replace(jobs, OLD.job_id||'\||$', '');
	insert into logs ("timestamp","log") values (now(),'DELETE JOB '||OLD.job_id);	
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER handle_job_delete
  AFTER DELETE
  ON job
  FOR EACH ROW
  EXECUTE PROCEDURE handle_job_delete();