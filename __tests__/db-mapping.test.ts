import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is missing from environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

describe('Database Integrations & Mappings', () => {
  it('Should have at least one active class for each active presentiel formation', async () => {
    // 1. Fetch all presentiel formations
    const { data: formations, error: formationsError } = await supabase
      .from('formations')
      .select('id, title, slug')
      .eq('type', 'presentiel')

    expect(formationsError).toBeNull()
    expect(formations).toBeDefined()
    
    // Si la base est vide, on ne peut pas vraiment tester grand chose, mais on s'assure qu'elle répond
    if (formations!.length === 0) {
      console.warn("Aucune formation en présentiel trouvée dans la base de test.")
      return;
    }

    // 2. Fetch all active classes
    const { data: classes, error: classesError } = await supabase
      .from('classes')
      .select('id, formation_id, name')
      .eq('is_active', true)
      
    expect(classesError).toBeNull()
    expect(classes).toBeDefined()

    // 3. Verify each formation has at least one linked class
    const orphanFormations: string[] = []

    for (const formation of formations!) {
      const linkedClasses = classes!.filter(c => c.formation_id === formation.id)
      if (linkedClasses.length === 0) {
        orphanFormations.push(`❌ La formation "${formation.title}" (slug: ${formation.slug}) n'a AUCUNE classe active qui lui est assignée.`)
      }
    }

    // Fail the test clearly with explanations if any orphans are found
    if (orphanFormations.length > 0) {
      throw new Error(`\n⚠️ ERREUR CRITIQUE D'INTÉGRITÉ DE BASE DE DONNÉES ⚠️\n\nDes élèves risquent d'être assignés "En attente" car les formations suivantes n'ont pas de classes :\n${orphanFormations.join('\n')}\n\nVeuillez créer et relier des classes à ces formations avant de déployer.\n`)
    }

    // Success
    expect(orphanFormations.length).toBe(0)
  })
})
