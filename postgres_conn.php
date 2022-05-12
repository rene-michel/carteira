<? 
  
class postgres{

        function __construct($HOST , $USUARIO, $SENHA, $BANCO) {
                $this->host = $HOST;
                $this->usuario = $USUARIO;
                $this->senha = $SENHA;
                $this->nome_banco= $BANCO;
                $this->con= pg_connect("host=$HOST dbname=$BANCO user=$USUARIO password=$SENHA");
                $sql = "SET DATESTYLE TO SQL, EUROPEAN";
                $this->executa($sql);
                $this->error();
                
        }

			function error(){
				pg_result_error($this->result);
			}
	
        function __destruct() {
				pg_close($this->con);
        }

        function executa($comando_sql) {

                $comando_sql = str_replace("''","null",$comando_sql);
                $comando_sql = str_replace(",,",",null,",$comando_sql);
                $comando_sql = str_replace(",)",",null)",$comando_sql);
                $comando_sql = str_replace("=''"," is null",$comando_sql);
                $comando_sql = str_replace("= ''"," is null",$comando_sql);

                $this->result = pg_exec($this->con,$comando_sql) or die ("Comando $comando_sql inválido!");  
                     
        }

        function trata_erro($comando_sql) {
                $comando_sql = str_replace("'","`",$comando_sql);
                $erro=pg_ErrorMessage($this->con);
                //echo "<br>erro: ".$erro;
                if (strstr($erro,"\"")) list($a,$parametro,$c)=explode("\"",$erro);
                else list($a,$parametro,$c)=explode("'",$erro);
                if (stristr($erro,"not exist")) $erro_trad="Tabela não existe: $parametro ";
                else if (stristr($erro,"pg_atoi")) $erro_trad="Tipo de dado inválido: $parametro ";
                     else if (stristr($erro,"parser")) $erro_trad="Erro de sintaxe:  $parametro";
                          else if (stristr($erro,"duplicate key")) $erro_trad="Não pode gravar item duplicado";
                               else if (stristr($erro,"Bad numeric")) $erro_trad="Formato de número inválido: $parametro";
                                    else if (stristr($erro,"Bad date")) $erro_trad="Formato de data inválido: $parametro";
                                         else if (stristr($erro,"Attribute")) $erro_trad="Atributo não encontrado: $parametro";
                                              else if (stristr($erro,"ambiguous")) $erro_trad="Coluna Referenciada é Ambígua: $parametro";
                                                   else $erro_trad="Erro Indeterminado<br>\n".$erro;

                ?><script>
                      erro='<?echo $erro;?>';
                      erro_trad='<?echo $erro_trad;?>';
                      comando_sql='<?echo $comando_sql;?>';
                      alert(erro_trad+'\n'+comando_sql+'\n'+erro);
                </script><?
                die ("<font color=red><b>$erro_trad<br>$comando_sql</b></font>");
        }	


        function proximo($contador) {
                return pg_fetch_array($this->result, $contador);
        }

        function proximo_resultado($coluna,$linha) {
                return pg_result($this->result,$coluna,$linha);
        }
	
		function resultado(){
			return pg_fetch_all($this->result);	
		}	
	
        function numero_de_linhas() {
                return pg_numrows($this->result);
        }
        function linhas_afetadas() {
                return pg_cmdtuples($this->result);
        }

        function exibe_instancia() {
                echo "SQL:" . $this->host . '-' . $this->usuario . '-' . $this->senha . '-' . $this->con . '-' . $this->nome_banco;
                return;
        }
}

?>
