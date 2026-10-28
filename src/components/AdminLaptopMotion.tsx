import { LaptopMockup, useLaptopViewport } from './LaptopMockup';
import { AdminThumbMotion } from './AdminThumbMotion';

/*
 * Handoff do case Admin Global: o mesmo notebook dos heros com a Administração Global dentro. O
 * cursor da própria tela percorre o menu lateral e as páginas vão trocando (mesma animação da thumb).
 */

const TABS = [{ title: 'Admin Global — Gupy', url: 'app.gupy.io/admin-global' }];
const NO_CURSOR = { x: 0, y: 0, visible: false, down: false };

export function AdminLaptopMotion() {
  const { viewRef, width, inView } = useLaptopViewport();
  return (
    <LaptopMockup viewRef={viewRef} width={width} tabs={TABS} activeTab={0} cursor={NO_CURSOR} pageBg="linear-gradient(90deg, #061329 50%, #F0F2F5 50%)" label="Administração Global trocando entre Importação unificada, Entidades, Posições e Pessoas usuárias">
      <AdminThumbMotion active={inView} fill />
    </LaptopMockup>
  );
}
